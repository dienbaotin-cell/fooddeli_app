const { getGeminiModel } = require("../config/gemini");
const { bucket } = require("../config/firebase");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const unlinkAsync = promisify(fs.unlink);
const mkdirAsync = promisify(fs.mkdir);

// FFmpeg/FFprobe - optional for serverless
let ffmpeg = null;
let ffmpegAvailable = false;

try {
  ffmpeg = require("fluent-ffmpeg");
  const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
  const ffprobePath = require("@ffprobe-installer/ffprobe").path;
  ffmpeg.setFfmpegPath(ffmpegPath);
  ffmpeg.setFfprobePath(ffprobePath);
  ffmpegAvailable = true;
  console.log("✅ FFmpeg available for video moderation");
} catch (err) {
  console.warn("⚠️ FFmpeg not available - video moderation will auto-approve");
  ffmpegAvailable = false;
}

const TEMP_DIR = path.join(__dirname, "../temp");
const FRAMES_DIR = path.join(TEMP_DIR, "frames");

/**
 * Đơn giản hóa cho serverless: auto-approve nếu không có FFmpeg
 */
const moderateLocalVideo = async (videoPath) => {
  // Cleanup video file
  const cleanup = async () => {
    try {
      if (fs.existsSync(videoPath)) {
        await unlinkAsync(videoPath);
        console.log("✅ Cleaned up video file:", videoPath);
      }
    } catch (err) {
      console.error("⚠️ Cleanup error:", err);
    }
  };

  // If FFmpeg not available (serverless), auto-approve
  if (!ffmpegAvailable) {
    console.warn("⚠️ [MODERATE] FFmpeg unavailable - auto-approving video");
    await cleanup();
    return {
      status: "approved",
      reason: "Auto-approved (serverless environment)",
      analyzedFrames: 0,
      flaggedFrames: [],
    };
  }

  // If FFmpeg available, do moderation (keep original logic)
  // TODO: Import original moderation logic here if needed
  console.log("🎬 [MODERATE] Full moderation available but skipped for now");
  await cleanup();
  return {
    status: "approved",
    reason: "Moderation feature temporarily disabled",
    analyzedFrames: 0,
    flaggedFrames: [],
  };
};

/**
 * Moderate video từ Firebase URL
 */
const moderateVideo = async (videoUrl) => {
  console.warn("⚠️ [MODERATE] Firebase URL moderation not supported in serverless - auto-approving");
  return {
    status: "approved",
    reason: "Auto-approved (serverless)",
    analyzedFrames: 0,
    flaggedFrames: [],
  };
};

module.exports = {
  moderateVideo,
  moderateLocalVideo,
};
