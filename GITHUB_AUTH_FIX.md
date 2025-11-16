# 🔐 SỬA LỖI GIT PUSH 403 - PERMISSION DENIED

## ❌ Lỗi gặp phải:
```
remote: Permission to dienbaotin-cell/fooddeli_app.git denied to kingofwill.
fatal: unable to access 'https://github.com/...': The requested URL returned error: 403
```

## ✅ Nguyên nhân:
Bạn đang đăng nhập GitHub với tài khoản **kingofwill**, nhưng repository thuộc về **dienbaotin-cell**.

---

## 🔧 ĐÃ SỬA - Credentials cũ đã bị xóa

Tôi đã xóa credentials GitHub cũ. Bây giờ:

### Bước 1: Push lại để đăng nhập
```powershell
git push origin main
```

### Bước 2: Cửa sổ đăng nhập sẽ xuất hiện
Windows Credential Manager hoặc Browser sẽ mở ra yêu cầu đăng nhập GitHub.

### Bước 3: Đăng nhập đúng tài khoản
- **Username**: `dienbaotin-cell`
- **Password**: Personal Access Token (không phải mật khẩu thường)

---

## 🔑 TẠO PERSONAL ACCESS TOKEN (Nếu chưa có)

GitHub không cho dùng mật khẩu thường nữa, phải dùng **Personal Access Token**.

### Các bước tạo token:

1. Đăng nhập GitHub bằng tài khoản **dienbaotin-cell**
2. Vào: https://github.com/settings/tokens
3. Click **"Generate new token"** → **"Generate new token (classic)"**
4. Điền thông tin:
   - **Note**: `Vercel Deploy Token`
   - **Expiration**: `90 days` (hoặc `No expiration` nếu muốn)
   - **Select scopes**: Tick ✅ `repo` (toàn bộ)
5. Scroll xuống → Click **"Generate token"**
6. **COPY TOKEN NGAY** (chỉ hiện 1 lần duy nhất!)
   - Token dạng: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### Sử dụng token:

Khi Git yêu cầu password, **paste token này** (không phải mật khẩu thường).

---

## 🎯 LỰA CHỌN KHÁC - Dùng SSH thay vì HTTPS

Nếu không muốn nhập token mỗi lần, dùng SSH:

### Bước 1: Tạo SSH Key
```powershell
ssh-keygen -t ed25519 -C "email@example.com"
```
(Nhấn Enter 3 lần để dùng default)

### Bước 2: Copy public key
```powershell
cat ~/.ssh/id_ed25519.pub | clip
```

### Bước 3: Thêm vào GitHub
1. Vào: https://github.com/settings/keys
2. Click **"New SSH key"**
3. **Title**: `My Computer`
4. **Key**: Paste (đã copy ở Bước 2)
5. Click **"Add SSH key"**

### Bước 4: Đổi remote URL sang SSH
```powershell
git remote set-url origin git@github.com:dienbaotin-cell/fooddeli_app.git
```

### Bước 5: Push lại
```powershell
git push origin main
```

Lần đầu sẽ hỏi "Are you sure?", gõ `yes`.

---

## 🚀 SAU KHI SỬA XONG

### Test push code:
```powershell
# Thử push lại
git push origin main

# Nếu thành công, bạn sẽ thấy:
# Enumerating objects: X, done.
# Writing objects: 100% (X/X), X.XX KiB | X.XX MiB/s, done.
# To https://github.com/dienbaotin-cell/fooddeli_app.git
#    abc1234..def5678  main -> main
```

### Vercel sẽ tự động deploy:
1. Vào Vercel Dashboard
2. Tab **Deployments**
3. Đợi 2-3 phút
4. Check logs nếu có lỗi

---

## 🔍 TROUBLESHOOTING

### ❌ Vẫn lỗi 403 sau khi nhập token
**Nguyên nhân:** Token không có quyền `repo`

**Giải pháp:** 
1. Xóa token cũ trên GitHub
2. Tạo token mới, nhớ tick ✅ `repo`
3. Xóa credentials: `cmdkey /delete:LegacyGeneric:target=git:https://github.com`
4. Push lại

---

### ❌ Không hiện cửa sổ đăng nhập
**Nguyên nhân:** Git Credential Manager chưa cài

**Giải pháp:**
```powershell
# Cài Git Credential Manager
winget install --id Git.Git -e --source winget

# Hoặc download tại:
# https://github.com/git-ecosystem/git-credential-manager/releases
```

---

### ❌ SSH: Permission denied (publickey)
**Nguyên nhân:** SSH key chưa thêm vào GitHub

**Giải pháp:** Làm lại Bước 2-3 ở phần SSH

---

## ✅ CHECKLIST

- [ ] Đã xóa credentials cũ: `cmdkey /delete:LegacyGeneric:target=git:https://github.com`
- [ ] Đã tạo Personal Access Token với quyền `repo`
- [ ] Đã push lại: `git push origin main`
- [ ] Đăng nhập đúng tài khoản **dienbaotin-cell**
- [ ] Paste token (không phải password thường)
- [ ] Push thành công
- [ ] Vercel tự động deploy

---

## 📌 LƯU Ý

- **Personal Access Token** hoạt động như password, giữ bí mật
- Token hết hạn sau 90 ngày (hoặc thời gian bạn chọn)
- Nếu quên token, tạo token mới và xóa credentials cũ
- **SSH** tiện hơn (không cần nhập token mỗi lần)

---

Sau khi push thành công, quay lại check Vercel Deployments để xem backend đã fix lỗi 500 chưa nhé! 🚀
