# 🚀 Hướng dẫn Deploy FoodDeli lên Vercel

## 📋 Yêu cầu trước khi deploy

- [x] Tài khoản GitHub (để push code)
- [x] Tài khoản Vercel (đăng ký miễn phí tại https://vercel.com)
- [x] Database PostgreSQL đã setup (Google Cloud SQL)
- [x] Firebase project đã cấu hình
- [x] Các API keys (Map4D, Gemini, PayOS)

---

## 🔧 BƯỚC 1: Chuẩn bị Repository

### 1.1. Tạo file `.gitignore` (nếu chưa có)

Đảm bảo file `.gitignore` ở root project có nội dung:

```
node_modules/
.env
.env.local
*.log
.DS_Store
dist/
build/
.cache/
*.swp
*.swo
server/.env
client/.env.local
server/config/serviceAccountKey.json
```

### 1.2. Push code lên GitHub

1. Vào https://github.com → Click **"New repository"**
2. Đặt tên repo: `fooddeli_app`
3. Chọn **Private** hoặc **Public**
4. **KHÔNG** tick "Initialize this repository with a README"
5. Click **"Create repository"**

6. Mở Terminal/PowerShell tại thư mục dự án:

```powershell
# Khởi tạo Git (nếu chưa có)
git init

# Add tất cả files
git add .

# Commit
git commit -m "Initial commit: FoodDeli App ready for deployment"

# Thêm remote (thay YOUR_USERNAME bằng tên GitHub của bạn)
git remote add origin https://github.com/YOUR_USERNAME/fooddeli_app.git

# Push lên GitHub
git branch -M main
git push -u origin main
```

---

## 🌐 BƯỚC 2: Deploy Backend (Server) lên Vercel

### 2.1. Đăng nhập Vercel

1. Truy cập: https://vercel.com
2. Click **"Sign Up"** hoặc **"Log In"**
3. Chọn **"Continue with GitHub"**
4. Cho phép Vercel truy cập GitHub của bạn

### 2.2. Import Project

1. Sau khi đăng nhập, click **"Add New..."** → **"Project"**
2. Trong danh sách repositories, tìm **`fooddeli_app`**
3. Click **"Import"** bên cạnh repository

### 2.3. Configure Project (Server)

**Framework Preset:** Chọn **"Other"**

**Root Directory:** 
- Click **"Edit"** 
- Chọn **`server`** 
- Click **"Continue"**

**Build Settings:**
- Build Command: `npm install`
- Output Directory: `.` (để trống hoặc dấu chấm)
- Install Command: `npm install`

### 2.4. Thêm Environment Variables (QUAN TRỌNG!)

Trong phần **"Environment Variables"**, thêm các biến sau:

Click **"Add"** cho từng biến:

| Key | Value | Ghi chú |
|-----|-------|---------|
| `DB_HOST` | `34.126.154.173` | IP Cloud SQL |
| `DB_PORT` | `5432` | Port PostgreSQL |
| `DB_NAME` | `foodsocial` | Tên database |
| `DB_USER` | `admin` | Username |
| `DB_PASS` | `Food_social123` | Password |
| `JWT_SECRET` | `adkfj2348sdlfkjsd9f8234jfsdlfkj3498sdjkf23sdf` | Secret key |
| `SMTP_USER` | `hohieudn2005@gmail.com` | Email SMTP |
| `SMTP_PASS` | `fwcs wcsi oxgz xvok` | Password email |
| `MAP4D_API_KEY` | `62b853a87d7eec55f5f37dfd215a6e85` | Map4D API |
| `GEMINI_API_KEY` | `AIzaSyDOM495akA_uWqufcnsaz5UBER4QYqgEjU` | Gemini AI |
| `PAYOS_CLIENT_ID` | `6f53659f-c6da-403d-a5be-2add704e99de` | PayOS |
| `PAYOS_API_KEY` | `26561732-6909-42bf-b32d-c4e8e4afb5a7` | PayOS |
| `PAYOS_CHECKSUM_KEY` | `042c50b7aefe494f5ee567d1b4c99afea01b17c7b9d4aa40fa6c76370f73a64a` | PayOS |
| `NODE_ENV` | `production` | Environment |

**Lưu ý:** Đối với `serviceAccountKey.json` của Firebase:
- Mở file `server/config/serviceAccountKey.json`
- Copy toàn bộ nội dung
- Thêm biến `FIREBASE_SERVICE_ACCOUNT` với value là JSON đã copy (stringify nếu cần)

### 2.5. Deploy Server

1. Click **"Deploy"**
2. Đợi 2-5 phút Vercel build và deploy
3. Sau khi deploy thành công, bạn sẽ có URL dạng:
   ```
   https://fooddeli-app-server.vercel.app
   ```
4. **LƯU LẠI URL NÀY** - sẽ dùng cho client

---

## 🎨 BƯỚC 3: Deploy Frontend (Client) lên Vercel

### 3.1. Tạo Project mới cho Client

1. Quay lại Vercel Dashboard
2. Click **"Add New..."** → **"Project"**
3. Import lại repository **`fooddeli_app`**

### 3.2. Configure Project (Client)

**Framework Preset:** Chọn **"Vite"**

**Root Directory:** 
- Click **"Edit"** 
- Chọn **`client`** 
- Click **"Continue"**

**Build Settings:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### 3.3. Thêm Environment Variables cho Client

Click **"Add"** cho từng biến:

| Key | Value | Ghi chú |
|-----|-------|---------|
| `VITE_API_URL` | `https://fooddeli-app-server.vercel.app/api` | URL server vừa deploy |

**Thay thế URL** bằng URL server bạn vừa deploy ở Bước 2!

### 3.4. Deploy Client

1. Click **"Deploy"**
2. Đợi 2-5 phút
3. Sau khi deploy thành công, bạn sẽ có URL:
   ```
   https://fooddeli-app.vercel.app
   ```

---

## ⚙️ BƯỚC 4: Cấu hình CORS cho Server

### 4.1. Cập nhật Allowed Origins

1. Vào project **Server** trên Vercel Dashboard
2. Click tab **"Settings"**
3. Click **"Environment Variables"**
4. Thêm biến mới:

| Key | Value |
|-----|-------|
| `ALLOWED_ORIGINS` | `https://fooddeli-app.vercel.app,http://localhost:5173` |

5. Click **"Save"**
6. Click tab **"Deployments"**
7. Click **"Redeploy"** ở deployment mới nhất

### 4.2. Cập nhật code CORS (nếu cần)

Nếu server chưa đọc biến `ALLOWED_ORIGINS`, cần update `server/server.js`:

```javascript
const allowedOrigins = [
  process.env.ALLOWED_ORIGINS?.split(',') || [],
  "http://localhost:5173",
  "http://localhost:5174",
].flat();
```

Sau đó push code mới lên GitHub, Vercel sẽ tự động redeploy.

---

## 🔥 BƯỚC 5: Cập nhật Firebase Config

### 5.1. Thêm Domain vào Firebase Console

1. Vào https://console.firebase.google.com
2. Chọn project **fooddeli-6d394**
3. Click **⚙️ Settings** → **Project settings**
4. Tab **"Authorized domains"**
5. Click **"Add domain"**
6. Nhập: `fooddeli-app.vercel.app` (domain Vercel của bạn)
7. Click **"Add"**

### 5.2. Cập nhật Redirect URLs (nếu dùng OAuth)

Nếu dùng Google Login:
1. Vào **Authentication** → **Sign-in method**
2. Click **Google**
3. Thêm URL vào **"Authorized redirect URIs"**:
   ```
   https://fooddeli-app.vercel.app/__/auth/handler
   ```

---

## 🗄️ BƯỚC 6: Cấu hình Database (Cloud SQL)

### 6.1. Cho phép Vercel IP truy cập Cloud SQL

**Lưu ý:** Vercel sử dụng IP động, nên cần:

**Cách 1: Cho phép tất cả IP (KHÔNG KHUYẾN KHÍCH cho production)**
1. Vào Google Cloud Console
2. SQL → Chọn instance `foodsocial`
3. **Connections** → **Networking**
4. Thêm network: `0.0.0.0/0`

**Cách 2: Sử dụng Cloud SQL Proxy (KHUYẾN NGHỊ)**
- Setup Cloud SQL Proxy trên Vercel (phức tạp hơn)
- Hoặc chuyển sang database hosted khác hỗ trợ Vercel (Supabase, PlanetScale, Neon)

**Cách 3: Dùng Connection String (nếu Cloud SQL hỗ trợ SSL)**
```
postgresql://admin:Food_social123@34.126.154.173:5432/foodsocial?sslmode=require
```

---

## ✅ BƯỚC 7: Kiểm tra Deploy

### 7.1. Test Backend API

Truy cập: `https://fooddeli-app-server.vercel.app/debug`

Kết quả mong đợi:
```
✅ Server đang chạy!
```

### 7.2. Test Frontend

Truy cập: `https://fooddeli-app.vercel.app`

Kiểm tra:
- [ ] Trang login hiển thị đúng
- [ ] Có thể đăng ký/đăng nhập
- [ ] API calls hoạt động
- [ ] Upload ảnh/video lên Firebase Storage OK

---

## 🔄 BƯỚC 8: Auto Deploy (CI/CD)

Vercel tự động deploy khi bạn push code lên GitHub:

1. Mỗi khi push lên branch `main` → Auto deploy Production
2. Mỗi khi tạo Pull Request → Auto deploy Preview
3. Xem logs deployment tại: Vercel Dashboard → Deployments

---

## 🐛 Troubleshooting

### Lỗi: "Cannot connect to database"
✅ Kiểm tra Cloud SQL có cho phép IP của Vercel
✅ Kiểm tra Environment Variables đã đúng chưa
✅ Xem logs: Vercel Dashboard → Project → Functions

### Lỗi: "CORS policy blocked"
✅ Cập nhật `ALLOWED_ORIGINS` với domain Vercel
✅ Redeploy server sau khi thay đổi

### Lỗi: "Cannot find module"
✅ Kiểm tra `package.json` có đầy đủ dependencies
✅ Kiểm tra Root Directory đã chọn đúng chưa

### Lỗi: Firebase "auth/unauthorized-domain"
✅ Thêm domain Vercel vào Firebase Authorized Domains

---

## 📱 BƯỚC 9: Custom Domain (Tùy chọn)

### 9.1. Thêm Domain riêng

1. Vào Vercel Dashboard → Project → **Settings** → **Domains**
2. Click **"Add"**
3. Nhập domain của bạn: `fooddeli.com`
4. Click **"Add"**
5. Cấu hình DNS theo hướng dẫn của Vercel:
   - Thêm A Record hoặc CNAME Record tại nhà cung cấp domain
6. Đợi DNS propagate (1-24 giờ)

---

## 📊 Monitoring & Analytics

### 9.1. Xem Logs

1. Vercel Dashboard → Project
2. Tab **"Functions"** → Xem realtime logs
3. Tab **"Analytics"** → Xem traffic, performance

### 9.2. Setup Alerts

1. Settings → **Notifications**
2. Bật email notifications cho:
   - Deployment failed
   - Production deployed

---

## 🎉 Hoàn thành!

Bạn đã deploy thành công FoodDeli lên Vercel! 

**URLs của bạn:**
- 🎨 Frontend: `https://fooddeli-app.vercel.app`
- ⚙️ Backend: `https://fooddeli-app-server.vercel.app/api`

**Next Steps:**
- [ ] Test toàn bộ tính năng trên production
- [ ] Setup custom domain
- [ ] Configure CDN cho media files
- [ ] Setup monitoring (Sentry, LogRocket)
- [ ] Enable Analytics

---

## 📞 Hỗ trợ

- Vercel Docs: https://vercel.com/docs
- Vercel Community: https://github.com/vercel/vercel/discussions
- Firebase Docs: https://firebase.google.com/docs
