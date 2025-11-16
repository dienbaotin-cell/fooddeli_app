# 🚨 VERCEL REDEPLOY MANUAL - FIX LỖI MULTER

## ❌ Lỗi hiện tại:
```
Cannot find module 'multer'
```

## ✅ Nguyên nhân:
Vercel vẫn đang chạy code cũ, chưa có commit mới với `multer` đã được thêm vào `server/package.json`.

## 🔧 Giải pháp: Redeploy Manual

### Bước 1: Vào Vercel Dashboard
1. Mở trình duyệt → https://vercel.com/dashboard
2. Chọn project **Server** (fooddeli-server)

### Bước 2: Redeploy Manual
1. Click tab **"Deployments"** (trên cùng)
2. Tìm deployment **mới nhất** (dòng đầu tiên)
3. Click nút **"..."** (ba chấm) bên phải deployment đó
4. Chọn **"Redeploy"**
5. Trong popup, chọn **"Redeploy"** (không cần thay đổi gì)
6. Đợi 2-3 phút để build xong

### Bước 3: Kiểm tra Logs
Sau khi redeploy:
1. Click vào deployment mới
2. Tab **"Functions"** hoặc **"Build Logs"**
3. Kiểm tra có lỗi gì không

### Bước 4: Test lại
Sau khi redeploy thành công:
- Truy cập: `https://your-server.vercel.app/debug`
- Kỳ vọng: `✅ Server đang chạy!`

---

## 📋 Checklist sau khi redeploy

- [ ] Vercel build thành công (không có lỗi đỏ)
- [ ] API `/debug` trả về `✅ Server đang chạy!`
- [ ] API `/api/products` trả về JSON array
- [ ] Không còn lỗi `Cannot find module 'multer'`

---

## 🔍 Nếu vẫn lỗi sau redeploy

### Lỗi: "Cannot find module 'multer'"
→ Có thể Vercel cache package.json cũ
→ Thử xóa và tạo lại project server

### Lỗi: "Cannot find module 'jsonwebtoken'"
→ Tương tự, redeploy lại

### Lỗi: "Cannot find module '@ffprobe-installer/linux-x64/ffprobe'"
→ Code mới đã fix, nhưng Vercel có thể cache
→ Redeploy sẽ fix

---

## 🎯 NEXT STEPS

1. **NGAY BÂY GIỜ:**
   - [ ] Redeploy manual trên Vercel
   - [ ] Check logs
   - [ ] Test API `/debug`

2. **SAU KHI SERVER OK:**
   - [ ] Thêm biến `FIREBASE_SERVICE_ACCOUNT` (nếu chưa)
   - [ ] Deploy Frontend
   - [ ] Test toàn bộ app

---

## 📞 Hỗ trợ

Nếu redeploy không hoạt động:
1. Xóa project Server trên Vercel
2. Import lại từ GitHub
3. Setup lại Environment Variables
4. Deploy lại

---

**Làm theo hướng dẫn trên là server sẽ chạy! 🚀**
