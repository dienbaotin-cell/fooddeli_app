# 🚀 HƯỚNG DẪN DEPLOY FOODDELI LÊN VERCEL
## (Thông qua giao diện Web - Không cần Command Line)

---

## 📌 TỔNG QUAN

Dự án FoodDeli cần deploy **2 phần riêng biệt**:
1. **Backend (Server)** - API Express.js
2. **Frontend (Client)** - React + Vite

Mỗi phần sẽ là 1 project độc lập trên Vercel.

---

## 🎯 BƯỚC 1: CHUẨN BỊ - PUSH CODE LÊN GITHUB

### 1.1. Tạo Repository trên GitHub

1. Mở trình duyệt, truy cập: **https://github.com**
2. Đăng nhập tài khoản GitHub
3. Click nút **"+"** góc phải trên → chọn **"New repository"**
4. Điền thông tin:
   - **Repository name**: `fooddeli_app`
   - **Description**: `Food delivery app - Fullstack JavaScript`
   - Chọn **Private** hoặc **Public** (tùy ý)
   - **KHÔNG** tick ô _"Add a README file"_
   - **KHÔNG** tick ô _"Add .gitignore"_
5. Click nút xanh **"Create repository"**
6. **GHI CHÚ URL** hiển thị (dạng: `https://github.com/YOUR_USERNAME/fooddeli_app.git`)

### 1.2. Push code lên GitHub

1. Mở **PowerShell** hoặc **Terminal**
2. Di chuyển vào thư mục dự án:
   ```powershell
   cd C:\Users\Admin\Downloads\fooddeli_app
   ```

3. Chạy lần lượt các lệnh sau:

   ```powershell
   # Khởi tạo Git
   git init
   
   # Thêm tất cả file
   git add .
   
   # Commit code
   git commit -m "Ready for Vercel deployment"
   
   # Thêm remote (THAY YOUR_USERNAME bằng username GitHub của bạn)
   git remote add origin https://github.com/YOUR_USERNAME/fooddeli_app.git
   
   # Đổi tên branch sang main
   git branch -M main
   
   # Push lên GitHub
   git push -u origin main
   ```

4. Nhập **username** và **password** GitHub khi được yêu cầu
   - **Lưu ý**: Nếu GitHub yêu cầu token thay vì password:
     - Vào GitHub → Settings → Developer settings → Personal access tokens → Generate new token
     - Copy token và dùng làm password

5. Reload trang GitHub repository, kiểm tra code đã lên chưa

---

## 🌐 BƯỚC 2: ĐĂNG KÝ VÀ ĐĂNG NHẬP VERCEL

### 2.1. Tạo tài khoản Vercel

1. Mở trình duyệt, truy cập: **https://vercel.com**
2. Click nút **"Sign Up"** (góc phải trên)
3. Chọn **"Continue with GitHub"**
4. Đăng nhập GitHub (nếu chưa đăng nhập)
5. Click **"Authorize Vercel"** để cho phép Vercel truy cập GitHub
6. Điền thông tin cá nhân (nếu được yêu cầu)
7. Chọn plan **"Hobby - Free"** (miễn phí)
8. Click **"Continue"**

### 2.2. Màn hình Dashboard

- Bạn sẽ thấy màn hình Dashboard của Vercel
- Có nút **"Add New..."** hoặc **"New Project"**

---

## 🔧 BƯỚC 3: DEPLOY BACKEND (SERVER)

### 3.1. Import Project

1. Trên Vercel Dashboard, click nút **"Add New..."** → chọn **"Project"**
2. Bạn sẽ thấy danh sách các repository từ GitHub
3. Tìm repository **`fooddeli_app`** (vừa tạo ở Bước 1)
4. Click nút **"Import"** bên cạnh repository đó

### 3.2. Configure Project Settings

Màn hình "Configure Project" xuất hiện:

**A. PROJECT NAME**
- Đặt tên: `fooddeli-server` (hoặc tên bạn thích)

**B. FRAMEWORK PRESET**
- Chọn: **"Other"** (vì đây là Node.js thuần)

**C. ROOT DIRECTORY**
- Click nút **"Edit"** bên phải
- Trong popup, chọn thư mục **`server`**
- Click **"Continue"**

**D. BUILD AND OUTPUT SETTINGS**
- **Build Command**: Để trống hoặc `npm install`
- **Output Directory**: Để trống (`.`)
- **Install Command**: `npm install`

Giữ nguyên các thiết lập khác.

### 3.3. Environment Variables (QUAN TRỌNG!)

Scroll xuống phần **"Environment Variables"**

Click nút **"Add"** và thêm từng biến sau:

| **NAME** | **VALUE** |
|----------|-----------|
| `DB_HOST` | `34.126.154.173` |
| `DB_PORT` | `5432` |
| `DB_NAME` | `foodsocial` |
| `DB_USER` | `admin` |
| `DB_PASS` | `Food_social123` |
| `JWT_SECRET` | `adkfj2348sdlfkjsd9f8234jfsdlfkj3498sdjkf23sdf` |
| `SMTP_USER` | `hohieudn2005@gmail.com` |
| `SMTP_PASS` | `fwcs wcsi oxgz xvok` |
| `MAP4D_API_KEY` | `62b853a87d7eec55f5f37dfd215a6e85` |
| `GEMINI_API_KEY` | `AIzaSyDOM495akA_uWqufcnsaz5UBER4QYqgEjU` |
| `PAYOS_CLIENT_ID` | `6f53659f-c6da-403d-a5be-2add704e99de` |
| `PAYOS_API_KEY` | `26561732-6909-42bf-b32d-c4e8e4afb5a7` |
| `PAYOS_CHECKSUM_KEY` | `042c50b7aefe494f5ee567d1b4c99afea01b17c7b9d4aa40fa6c76370f73a64a` |
| `NODE_ENV` | `production` |

**Cách thêm mỗi biến:**
1. Click **"Add"** (hoặc nút có icon "+")
2. Điền **NAME** (tên biến) vào ô bên trái
3. Điền **VALUE** (giá trị) vào ô bên phải
4. Click nút **"Add"** nhỏ bên dưới (hoặc Enter)
5. Lặp lại cho các biến tiếp theo

**🔥 ĐẶC BIỆT: Firebase Service Account**

Vì `serviceAccountKey.json` không thể upload trực tiếp, cần chuyển thành biến môi trường:

1. Mở file: `server/config/serviceAccountKey.json` bằng Notepad
2. Copy **TOÀN BỘ** nội dung JSON
3. Thêm biến environment:
   - **NAME**: `FIREBASE_SERVICE_ACCOUNT`
   - **VALUE**: Paste toàn bộ JSON vừa copy (giữ nguyên format)

4. Sau đó cần sửa file `server/config/firebase.js` để đọc từ biến môi trường:
   - Bạn sẽ cần push code mới sau bước này (sẽ hướng dẫn ở cuối)

### 3.4. Deploy Server

1. Sau khi điền xong tất cả Environment Variables
2. Click nút to **"Deploy"** màu xanh
3. Vercel bắt đầu build project (màn hình hiển thị logs)
4. Đợi khoảng **2-5 phút** (tùy tốc độ mạng)

**Kết quả:**
- Nếu thành công: Màn hình hiển thị **"Congratulations!"** và 🎉
- Bạn sẽ có URL dạng: `https://fooddeli-server.vercel.app`
- **GHI CHÚ URL NÀY** - sẽ dùng cho frontend

**Nếu lỗi:**
- Click **"View Function Logs"** để xem chi tiết lỗi
- Kiểm tra lại Environment Variables
- Xem phần Troubleshooting ở cuối guide

### 3.5. Kiểm tra Backend hoạt động

1. Copy URL server vừa deploy (VD: `https://fooddeli-server.vercel.app`)
2. Mở trình duyệt mới
3. Truy cập: `https://fooddeli-server.vercel.app/debug`
4. Nếu thấy: **"✅ Server đang chạy!"** → Thành công!

---

## 🎨 BƯỚC 4: DEPLOY FRONTEND (CLIENT)

### 4.1. Tạo Project mới

1. Quay lại **Vercel Dashboard** (click logo Vercel góc trái)
2. Click nút **"Add New..."** → **"Project"**
3. Lại chọn repository **`fooddeli_app`** (lần này deploy client)
4. Click **"Import"**

### 4.2. Configure Project Settings

**A. PROJECT NAME**
- Đặt tên: `fooddeli-app` (hoặc tên bạn thích cho frontend)

**B. FRAMEWORK PRESET**
- Chọn: **"Vite"**

**C. ROOT DIRECTORY**
- Click **"Edit"**
- Chọn thư mục **`client`**
- Click **"Continue"**

**D. BUILD AND OUTPUT SETTINGS**
- **Build Command**: `npm run build` (hoặc `vite build`)
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 4.3. Environment Variables cho Client

Thêm biến:

| **NAME** | **VALUE** |
|----------|-----------|
| `VITE_API_URL` | `https://fooddeli-server.vercel.app/api` |

⚠️ **QUAN TRỌNG**: 
- Thay `fooddeli-server.vercel.app` bằng URL server bạn vừa deploy ở Bước 3
- Nhớ thêm `/api` vào cuối

### 4.4. Deploy Client

1. Click nút **"Deploy"**
2. Đợi 2-5 phút
3. Nếu thành công, bạn sẽ có URL: `https://fooddeli-app.vercel.app`

### 4.5. Kiểm tra Frontend

1. Truy cập URL frontend vừa deploy
2. Kiểm tra:
   - ✅ Trang login hiển thị
   - ✅ Có thể đăng ký/đăng nhập
   - ✅ Gọi API được (check Network tab trong DevTools)

---

## ⚙️ BƯỚC 5: CẤU HÌNH CORS CHO SERVER

Để Frontend gọi được Backend, cần cấu hình CORS:

### 5.1. Thêm biến ALLOWED_ORIGINS

1. Vào Vercel Dashboard
2. Click vào project **Server** (fooddeli-server)
3. Click tab **"Settings"** (trên cùng)
4. Bên trái, click **"Environment Variables"**
5. Click **"Add New"**
6. Thêm:
   - **NAME**: `ALLOWED_ORIGINS`
   - **VALUE**: `https://fooddeli-app.vercel.app,http://localhost:5173`
   
   (Thay `fooddeli-app.vercel.app` bằng domain frontend của bạn)

7. Click **"Save"**

### 5.2. Redeploy Server

1. Click tab **"Deployments"** (trên cùng)
2. Tìm deployment mới nhất (dòng đầu tiên)
3. Click nút **"⋯"** (3 chấm) bên phải
4. Chọn **"Redeploy"**
5. Click **"Redeploy"** trong popup xác nhận
6. Đợi deployment hoàn tất

---

## 🔥 BƯỚC 6: CẤU HÌNH FIREBASE

### 6.1. Thêm Authorized Domain

1. Mở trình duyệt, truy cập: **https://console.firebase.google.com**
2. Chọn project: **fooddeli-6d394**
3. Click icon **⚙️ Settings** (góc trái) → **Project settings**
4. Scroll xuống phần **"Your apps"**
5. Click tab **"General"**
6. Scroll xuống phần **"Authorized domains"**
7. Click **"Add domain"**
8. Nhập: `fooddeli-app.vercel.app` (domain Vercel frontend của bạn)
9. Click **"Add"**

### 6.2. Cấu hình Google Sign-In (nếu dùng)

1. Sidebar bên trái, click **"Authentication"**
2. Click tab **"Sign-in method"**
3. Click vào **"Google"**
4. Trong **"Authorized redirect URIs"**, thêm:
   ```
   https://fooddeli-app.vercel.app/__/auth/handler
   ```
5. Click **"Save"**

---

## 🗄️ BƯỚC 7: CẤU HÌNH DATABASE (CLOUD SQL)

### 7.1. Cho phép Vercel truy cập Cloud SQL

**⚠️ LƯU Ý**: Vercel sử dụng IP động, có 3 cách xử lý:

#### **Cách 1: Cho phép tất cả IP (Đơn giản nhưng kém bảo mật)**

1. Truy cập: **https://console.cloud.google.com**
2. Chọn project chứa Cloud SQL
3. Menu bên trái: **SQL** → Chọn instance `foodsocial`
4. Tab **"Connections"**
5. Click **"Networking"**
6. Phần **"Authorized networks"**, click **"Add network"**
7. Điền:
   - **Name**: `Vercel All IPs`
   - **Network**: `0.0.0.0/0`
8. Click **"Done"** → **"Save"**

#### **Cách 2: Chuyển sang database khác (Khuyến nghị)**

Sử dụng database hỗ trợ tốt hơn cho serverless:
- **Supabase** (PostgreSQL - Free tier)
- **PlanetScale** (MySQL - Free tier)
- **Neon** (PostgreSQL - Free tier)

#### **Cách 3: Cloud SQL Proxy (Phức tạp)**

Cần cấu hình Cloud SQL Proxy trên Vercel (nâng cao).

---

## ✅ BƯỚC 8: KIỂM TRA TOÀN BỘ HỆ THỐNG

### 8.1. Test Backend

1. Truy cập: `https://fooddeli-server.vercel.app/debug`
2. Kết quả: **"✅ Server đang chạy!"**

3. Test API: `https://fooddeli-server.vercel.app/api/products`
4. Kết quả: JSON danh sách sản phẩm (hoặc [])

### 8.2. Test Frontend

1. Truy cập: `https://fooddeli-app.vercel.app`
2. Test các chức năng:
   - ✅ Đăng ký tài khoản
   - ✅ Đăng nhập
   - ✅ Xem danh sách sản phẩm
   - ✅ Xem video
   - ✅ Upload ảnh

### 8.3. Kiểm tra Logs (nếu có lỗi)

**Server Logs:**
1. Vercel Dashboard → Project **Server**
2. Tab **"Deployments"** → Click deployment mới nhất
3. Click **"View Function Logs"**
4. Xem real-time logs

**Client Logs:**
1. Mở DevTools trong browser (F12)
2. Tab **"Console"** → Xem lỗi JavaScript
3. Tab **"Network"** → Xem API calls

---

## 🔄 BƯỚC 9: TỰ ĐỘNG DEPLOY KHI PUSH CODE

Vercel tự động deploy mỗi khi bạn push code mới lên GitHub:

### 9.1. Cách hoạt động

- **Push lên branch `main`** → Auto deploy **Production**
- **Tạo Pull Request** → Auto deploy **Preview** (URL tạm)
- **Merge PR** → Auto deploy Production

### 9.2. Xem deployment history

1. Vercel Dashboard → Project
2. Tab **"Deployments"**
3. Xem tất cả các lần deploy, logs, status

### 9.3. Push code mới

Khi bạn sửa code và muốn deploy:

```powershell
cd C:\Users\Admin\Downloads\fooddeli_app

git add .
git commit -m "Update feature XYZ"
git push origin main
```

→ Vercel tự động build và deploy trong vài phút!

---

## 🌐 BƯỚC 10: CUSTOM DOMAIN (TÙY CHỌN)

### 10.1. Mua tên miền

Nếu muốn domain riêng (VD: `fooddeli.com`):
- Mua tại: **Namecheap**, **GoDaddy**, **Google Domains**, v.v.

### 10.2. Thêm domain vào Vercel

1. Vercel Dashboard → Project **Frontend**
2. Tab **"Settings"**
3. Sidebar: **"Domains"**
4. Click **"Add"**
5. Nhập domain: `fooddeli.com`
6. Click **"Add"**

### 10.3. Cấu hình DNS

Vercel sẽ hướng dẫn thêm DNS records:

1. Đăng nhập vào nhà cung cấp domain
2. Vào phần **DNS Management**
3. Thêm record theo hướng dẫn Vercel:
   - **Type**: A hoặc CNAME
   - **Name**: @ hoặc www
   - **Value**: `76.76.21.21` (hoặc cname.vercel-dns.com)
4. Lưu lại

### 10.4. Đợi DNS propagate

- Thời gian: 10 phút - 24 giờ
- Kiểm tra: `https://dnschecker.org`
- Sau khi xong, domain của bạn sẽ trỏ đến Vercel

---

## 📊 BƯỚC 11: MONITORING & ANALYTICS

### 11.1. Xem Analytics

1. Vercel Dashboard → Project
2. Tab **"Analytics"**
3. Xem:
   - Page views
   - Unique visitors
   - Top pages
   - Performance metrics

### 11.2. Setup Notifications

1. Vercel Dashboard → **Account Settings** (avatar góc phải)
2. **Notifications**
3. Bật email cho:
   - ✅ Deployment Failed
   - ✅ Production Deployed
   - ✅ Comments on deployments

### 11.3. Function Logs

1. Project → Tab **"Deployments"**
2. Click deployment mới nhất
3. **View Function Logs** → Real-time logs từ server

---

## 🐛 TROUBLESHOOTING - XỬ LÝ LỖI THƯỜNG GẶP

### ❌ Lỗi: "Cannot connect to database"

**Nguyên nhân:**
- Cloud SQL không cho phép IP của Vercel
- Environment Variables sai

**Cách sửa:**
1. Kiểm tra Cloud SQL Authorized Networks (Bước 7.1)
2. Kiểm tra lại Environment Variables (Bước 3.3)
3. Xem Function Logs để biết lỗi cụ thể

---

### ❌ Lỗi: "CORS policy blocked"

**Hiện tượng:** Frontend không gọi được API, console hiển thị lỗi CORS

**Cách sửa:**
1. Kiểm tra biến `ALLOWED_ORIGINS` đã thêm chưa (Bước 5.1)
2. Kiểm tra URL trong `ALLOWED_ORIGINS` có đúng domain frontend không
3. Redeploy server (Bước 5.2)

---

### ❌ Lỗi: "Cannot find module"

**Nguyên nhân:**
- Package.json thiếu dependency
- Root directory chọn sai

**Cách sửa:**
1. Kiểm tra `package.json` có đầy đủ dependencies không
2. Settings → Root Directory → Đảm bảo chọn đúng `server` hoặc `client`
3. Redeploy

---

### ❌ Lỗi: Firebase "auth/unauthorized-domain"

**Nguyên nhân:** Domain Vercel chưa được thêm vào Firebase

**Cách sửa:**
1. Làm theo Bước 6.1
2. Thêm domain Vercel vào Authorized Domains

---

### ❌ Lỗi: Build failed - "Command not found"

**Nguyên nhân:** Build command sai

**Cách sửa:**
1. Settings → Build & Development Settings
2. **Build Command**: 
   - Server: `npm install` (hoặc để trống)
   - Client: `npm run build`
3. Redeploy

---

### ❌ Lỗi: 404 Not Found khi truy cập route Frontend

**Nguyên nhân:** SPA routing chưa config

**Cách sửa:**
- File `client/vercel.json` đã được tạo với rewrites
- Nếu vẫn lỗi, check lại file này đã commit lên GitHub chưa

---

## 🎉 HOÀN THÀNH!

Bạn đã deploy thành công **FoodDeli App** lên Vercel!

### 📝 Checklist cuối cùng:

- ✅ Backend đã deploy: `https://fooddeli-server.vercel.app`
- ✅ Frontend đã deploy: `https://fooddeli-app.vercel.app`
- ✅ Environment Variables đã setup đầy đủ
- ✅ CORS đã cấu hình
- ✅ Firebase Authorized Domains đã thêm
- ✅ Database connection hoạt động
- ✅ Test tất cả chức năng chính

### 🚀 Next Steps:

1. **Test toàn bộ tính năng** trên production
2. **Setup custom domain** (nếu có)
3. **Configure CDN** cho media files
4. **Setup monitoring**: Sentry, LogRocket
5. **Enable Analytics** để theo dõi traffic
6. **Backup database** định kỳ
7. **Setup CI/CD** cho testing tự động

### 📞 Tài liệu tham khảo:

- Vercel Docs: https://vercel.com/docs
- Vercel Community: https://github.com/vercel/vercel/discussions
- Firebase Docs: https://firebase.google.com/docs
- PostgreSQL on Vercel: https://vercel.com/guides/using-databases-with-vercel

---

**Chúc mừng bạn! 🎊**

Nếu gặp vấn đề, hãy kiểm tra Function Logs hoặc tham khảo phần Troubleshooting ở trên.
