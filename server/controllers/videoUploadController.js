const fs = require("fs");
const path = require("path");
const { bucket } = require("../config/firebase");
const { v4: uuidv4 } = require("uuid");

// Use serverless-compatible moderation service
const moderationService = process.env.NODE_ENV === 'production'
  ? require("../services/videoModerationService.serverless")
  : require("../services/videoModerationService");

const { moderateVideo, moderateLocalVideo } = moderationService;
const videoService = require("../services/videoService");

/**
 * Upload video lên Firebase Storage và trả về URL có token bảo mật
 * (giống dạng https://firebasestorage.googleapis.com/v0/b/.../token=xxxx)
 */
const uploadVideoOnly = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Không có file video nào được gửi lên" });
    }

    const file = req.file;
    const folderPath = "videos/shop_video";
    const fileName = `${folderPath}/${uuidv4()}_${file.originalname}`;
    const fileUpload = bucket.file(fileName);

    const token = uuidv4(); // ✅ tạo token truy cập riêng

    console.log(`🎬 [UPLOAD] Uploading file ${fileName}`);

    const tempDir = path.join(__dirname, "../temp");
    const tempVideoPath = path.join(tempDir, `upload_${Date.now()}_${file.originalname}`);

    await fs.promises.mkdir(tempDir, { recursive: true });
    await fs.promises.writeFile(tempVideoPath, file.buffer);

    const moderationPromise = moderateLocalVideo(tempVideoPath);

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
        metadata: { firebaseStorageDownloadTokens: token }, // ✅ gán token cho file
      },
    });

    stream.on("error", (err) => {
      console.error("❌ Firebase upload error:", err);
      res.status(500).json({ success: false, message: "Lỗi upload video", details: err.message });
    });

    stream.on("finish", async () => {
      try {
        const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(
          fileName
        )}?alt=media&token=${token}`;

        console.log(`✅ [UPLOAD] Done: ${publicUrl}`);
        console.log(`🤖 [MODERATION] Đang chờ kết quả kiểm duyệt video (local)...`);

        const moderationResult = await moderationPromise;

        console.log(`✅ [MODERATION] Kết quả:`, moderationResult);

        let savedVideo = null;
        const hasShopAndTitle = req.body && req.body.shop_id && req.body.title;
        if (hasShopAndTitle && moderationResult && moderationResult.status === "approved") {
          const payload = {
            title: String(req.body.title || "").trim(),
            description: String(req.body.description || "").trim(),
            video_url: publicUrl,
            shop_id: Number(req.body.shop_id),
            status: moderationResult.status,
            moderation_result: moderationResult,
          };
          savedVideo = await videoService.createVideo(payload);
        }

        res.status(200).json({
          success: true,
          message: "Upload video thành công!",
          videoUrl: publicUrl,
          storagePath: `gs://${bucket.name}/${fileName}`,
          token: token,
          moderationResult: moderationResult,
          savedVideo: savedVideo,
        });
      } catch (err) {
        console.error("⚠️ Lỗi khi xử lý URL hoặc kiểm duyệt:", err);
        res.status(500).json({ success: false, message: "Lỗi khi xử lý upload/kiểm duyệt video", details: err.message });
      }
    });

    stream.end(file.buffer);
  } catch (err) {
    console.error("🔥 Lỗi server upload video:", err);
    res.status(500).json({
      success: false,
      message: "Upload thất bại",
      details: err.message,
    });
  }
};

module.exports = { uploadVideoOnly };
