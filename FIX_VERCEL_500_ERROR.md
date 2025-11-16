# 🔧 SỬA LỖI VERCEL 500 - FUNCTION_INVOCATION_FAILED

## ❌ Lỗi bạn gặp:
```
500: INTERNAL_SERVER_ERROR
Code: FUNCTION_INVOCATION_FAILED
```

## ✅ Nguyên nhân & Cách sửa:

### 1️⃣ **Firebase Service Account chưa setup**

**Vấn đề:** File `serviceAccountKey.json` không được upload lên Vercel (vì .gitignore)

**Giải pháp:**

#### Bước 1: Lấy nội dung Firebase Service Account
1. Mở file `server/config/serviceAccountKey.json` bằng Notepad
2. Copy **TOÀN BỘ** nội dung (từ `{` đến `}`)
3. Minify JSON (loại bỏ xuống dòng):
   - Vào: https://www.minifyjson.org/
   - Paste JSON vào
   - Click "Minify"
   - Copy kết quả

#### Bước 2: Thêm vào Vercel Environment Variables
1. Vào Vercel Dashboard → Project **Server**
2. Tab **Settings** → **Environment Variables**
3. Click **Add New**
4. Điền:
   - **NAME**: `FIREBASE_SERVICE_ACCOUNT`
   - **VALUE**: Paste JSON đã minify
5. Click **Save**

---

### 2️⃣ **Database SSL Configuration**

**Vấn đề:** Cloud SQL yêu cầu SSL khi connect từ Vercel

**Giải pháp:** Đã fix trong code (tự động bật SSL khi `NODE_ENV=production`)

#### Kiểm tra Environment Variables trên Vercel:
Đảm bảo có đủ các biến sau:

| Variable | Example Value | Ghi chú |
|----------|---------------|---------|
| `DB_HOST` | `34.126.154.173` | IP Cloud SQL |
| `DB_PORT` | `5432` | Port PostgreSQL |
| `DB_NAME` | `foodsocial` | Database name |
| `DB_USER` | `admin` | Username |
| `DB_PASS` | `Food_social123` | Password |
| `NODE_ENV` | `production` | **QUAN TRỌNG** |

---

### 3️⃣ **Cloud SQL Network Access**

**Vấn đề:** Cloud SQL chặn IP của Vercel

**Giải pháp:**

#### Option 1: Cho phép tất cả IP (Đơn giản - CHỈ DÙNG CHO TEST)
1. Vào Google Cloud Console
2. SQL → Instance → Connections → Networking
3. Add Authorized Network:
   - **Name**: `Vercel All IPs`
   - **Network**: `0.0.0.0/0`
4. Save

#### Option 2: Dùng Connection String (Khuyến nghị)
1. Vào Cloud SQL → Overview
2. Copy **Connection name** (dạng: `project-id:region:instance-name`)
3. Thêm vào Vercel env:
   ```
   DATABASE_URL=postgresql://admin:Food_social123@/foodsocial?host=/cloudsql/PROJECT:REGION:INSTANCE
   ```

#### Option 3: Chuyển sang Serverless Database (TỐT NHẤT)
Các database serverless-friendly:
- **Supabase** (PostgreSQL - Free tier): https://supabase.com
- **Neon** (PostgreSQL - Free tier): https://neon.tech
- **PlanetScale** (MySQL - Free tier): https://planetscale.com

---

### 4️⃣ **CORS Configuration**

**Vấn đề:** Frontend không được phép gọi Backend

**Giải pháp:**

1. Thêm biến `ALLOWED_ORIGINS` vào Vercel:
   ```
   ALLOWED_ORIGINS=https://your-frontend.vercel.app,http://localhost:5173
   ```
   (Thay `your-frontend.vercel.app` bằng domain frontend thực tế)

2. **Redeploy** server sau khi thêm biến

---

## 🚀 CHECKLIST DEPLOY LẠI

### Bước 1: Kiểm tra Environment Variables
Vào Vercel Dashboard → Server Project → Settings → Environment Variables

✅ Đảm bảo có đủ 14 biến:
- [ ] `DB_HOST`
- [ ] `DB_PORT`
- [ ] `DB_NAME`
- [ ] `DB_USER`
- [ ] `DB_PASS`
- [ ] `JWT_SECRET`
- [ ] `SMTP_USER`
- [ ] `SMTP_PASS`
- [ ] `MAP4D_API_KEY`
- [ ] `GEMINI_API_KEY`
- [ ] `PAYOS_CLIENT_ID`
- [ ] `PAYOS_API_KEY`
- [ ] `PAYOS_CHECKSUM_KEY`
- [ ] `FIREBASE_SERVICE_ACCOUNT` ← **QUAN TRỌNG NHẤT**
- [ ] `ALLOWED_ORIGINS`
- [ ] `NODE_ENV=production`

### Bước 2: Push code mới lên GitHub
```powershell
cd C:\Users\Admin\Downloads\fooddeli_app
git add .
git commit -m "Fix Vercel serverless deployment"
git push origin main
```

### Bước 3: Vercel tự động redeploy
- Đợi 2-3 phút
- Check Deployment Logs

### Bước 4: Kiểm tra lại
1. Truy cập: `https://your-server.vercel.app/debug`
2. Kỳ vọng: `✅ Server đang chạy!`

---

## 🔍 XEM LOGS ĐỂ DEBUG

### Cách xem logs chi tiết trên Vercel:

1. Vào Vercel Dashboard → Server Project
2. Tab **Deployments**
3. Click vào deployment mới nhất
4. Click **View Function Logs** hoặc **Build Logs**
5. Tìm dòng lỗi màu đỏ

### Các lỗi thường gặp trong logs:

#### ❌ "Cannot find module 'serviceAccountKey.json'"
→ Thiếu biến `FIREBASE_SERVICE_ACCOUNT` (làm theo Bước 1 ở trên)

#### ❌ "Connection refused" hoặc "ECONNREFUSED"
→ Cloud SQL chặn IP Vercel (làm theo Bước 3 Option 1)

#### ❌ "SSL connection required"
→ Thiếu `NODE_ENV=production` hoặc config SSL sai

#### ❌ "Invalid service account"
→ JSON trong `FIREBASE_SERVICE_ACCOUNT` bị lỗi format

---

## 🆘 NẾU VẪN LỖI

### Test local trước:
```powershell
cd server
npm install
node server.js
```

Nếu local OK nhưng Vercel lỗi → Chắc chắn là thiếu Environment Variables

### Test từng phần:

1. **Test Database:**
   ```javascript
   // Tạo file test-db.js trong server/
   const pool = require('./config/db');
   pool.query('SELECT NOW()')
     .then(res => console.log('DB OK:', res.rows))
     .catch(err => console.error('DB Error:', err));
   ```

2. **Test Firebase:**
   ```javascript
   // Tạo file test-firebase.js
   const { admin } = require('./config/firebase');
   console.log('Firebase OK:', admin.app().name);
   ```

---

## 📞 NEXT STEPS

1. **NGAY BÂY GIỜ:**
   - [ ] Thêm biến `FIREBASE_SERVICE_ACCOUNT` vào Vercel
   - [ ] Push code đã fix lên GitHub
   - [ ] Đợi auto-deploy
   - [ ] Check logs

2. **SAU KHI CHẠY ĐƯỢC:**
   - [ ] Setup Cloud SQL Proxy (bảo mật hơn)
   - [ ] Hoặc migrate sang Supabase/Neon
   - [ ] Setup monitoring (Sentry)
   - [ ] Backup database

---

## ✅ CODE ĐÃ FIX

Các file đã được sửa tự động:
- ✅ `server/server.js` - Export cho Vercel, không listen port khi production
- ✅ `server/config/db.js` - SSL auto, serverless-friendly pool config
- ✅ `server/config/firebase.js` - Đọc credentials từ env variable
- ✅ `server/vercel.json` - Config timeout cho functions

**BẠN CHỈ CẦN:**
1. Thêm `FIREBASE_SERVICE_ACCOUNT` vào Vercel Environment Variables
2. Push code: `git push origin main`
3. Đợi deploy xong!

---

Nếu vẫn lỗi sau khi làm theo, gửi cho tôi **Function Logs** từ Vercel để debug chi tiết hơn!
