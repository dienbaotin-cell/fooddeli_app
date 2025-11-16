// server/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { setupSession } from "./services/sessionService.js";

// Import tất cả các route
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import shopRoutes from "./routes/shopRoutes.js";
import shipperRoutes from "./routes/shipperRoutes.js";
import followRoutes from "./routes/followRoutes.js";
import videoLikeRoutes from "./routes/videoLikeRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import imageUploadRouter from "./routes/imageUploadRouter.js";
import map4dRoutes from "./routes/map4dRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import voucherRoutes from "./routes/voucherRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js"; // 🔹 PayOS route
import reviewRoutes from "./routes/reviewRoutes.js";
import shopContractRoutes from "./routes/shopContractRoutes.js";
import shipperContractRoutes from "./routes/shipperContractRoutes.js";
import userShopContractRoutes from "./routes/userShopContractRoutes.js";
import userShipperContractRoutes from "./routes/userShipperContractRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import provinceRoutes from "./routes/provinceRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import videoCommentRoutes from "./routes/videoCommentRoutes.js";


dotenv.config();

const app = express();
app.set("trust proxy", 1);

// ✅ Cấu hình CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',')
  : [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://yourdomain.com",
      "https://www.yourdomain.com",
    ];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error("CORS not allowed for this origin"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Đáp ứng preflight request
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res.sendStatus(204);
  }
  next();
});

// ✅ Middleware cơ bản
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
setupSession(app);

// ✅ Mount tất cả các routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/shops", shopRoutes);
app.use("/api/follows", followRoutes);
app.use("/api/video-likes", videoLikeRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/images", imageUploadRouter);
app.use("/api/map4d", map4dRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/vouchers", voucherRoutes);
app.use("/api/shipper", shipperRoutes);
app.use("/api/payments", paymentRoutes); // ✅ Mount route PayOS
app.use("/api/reviews", reviewRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/shop-contracts", shopContractRoutes);
app.use("/api/shipper-contracts", shipperContractRoutes);
app.use("/api/user-shop-contracts", userShopContractRoutes);
app.use("/api/user-shipper-contracts", userShipperContractRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/provinces", provinceRoutes);
app.use("/api/video-comments", videoCommentRoutes);

// ✅ Route kiểm tra nhanh
app.get("/debug", (req, res) => res.send("✅ Server đang chạy!"));
app.get("/", (req, res) => res.send("✅ API hoạt động ổn định!"));
app.get("/api/payments/ping", (req, res) => res.send("✅ /api/payments route hoạt động OK!"));

// ✅ Khởi động server
const PORT = process.env.PORT || 5000;

// Chỉ listen khi chạy local (không phải Vercel)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
  });
}

// Export cho Vercel Serverless
export default app;
