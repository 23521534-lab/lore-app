# lore. ✦

> Track everything you read, watch, and listen to — beautifully.

---

## Cấu trúc project

```
lore-app/
├── app/                        ← Expo Router (navigation)
│   ├── _layout.tsx             ← Root layout + fonts
│   ├── (tabs)/
│   │   ├── _layout.tsx         ← Tab bar custom
│   │   ├── index.tsx           ← Home
│   │   ├── search.tsx          ← Search
│   │   └── boards.tsx          ← Lore Boards
│   ├── add.tsx                 ← Add item (modal)
│   ├── item/[id].tsx           ← Item detail (modal)
│   ├── library.tsx             ← Full library
│   └── profile.tsx             ← Profile
├── src/
│   ├── screens/                ← Screen components
│   │   ├── HomeScreen.tsx
│   │   ├── SearchScreen.tsx
│   │   ├── AddScreen.tsx
│   │   ├── ItemDetailScreen.tsx
│   │   ├── LibraryScreen.tsx
│   │   ├── BoardsScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── components/
│   │   └── index.tsx           ← Reusable UI components
│   ├── store/
│   │   └── index.ts            ← Zustand state management
│   └── constants/
│       └── index.ts            ← Colors, fonts, icons, data
├── assets/                     ← icon.png, splash.png (thêm sau)
├── app.json
├── package.json
├── babel.config.js
├── metro.config.js
└── tsconfig.json
```

---

## BƯỚC 1 — Cài đặt môi trường

### 1.1 Cài Node.js
- Vào https://nodejs.org → tải bản **LTS**
- Cài xong mở Terminal trong VS Code và kiểm tra:
```bash
node --version    # phải ra v18 hoặc cao hơn
npm --version
```

### 1.2 Cài Expo CLI
```bash
npm install -g expo-cli eas-cli
```

### 1.3 Cài extensions VS Code (khuyến nghị)
- **React Native Tools** (Microsoft)
- **Prettier - Code formatter**
- **TypeScript + JavaScript** (có sẵn)

---

## BƯỚC 2 — Chạy app lần đầu

### 2.1 Mở folder trong VS Code
```
File → Open Folder → chọn thư mục lore-app
```

### 2.2 Mở Terminal trong VS Code
```
Terminal → New Terminal  (hoặc Ctrl + `)
```

### 2.3 Cài thư viện fonts (cần thêm)
```bash
npx expo install @expo-google-fonts/syne @expo-google-fonts/space-grotesk
```

### 2.4 Cài tất cả dependencies
```bash
npm install
```

### 2.5 Chạy app
```bash
npx expo start
```

Màn hình sẽ hiện QR code. Bây giờ có 2 cách xem:

---

## BƯỚC 3 — Xem app trên điện thoại (NHANH NHẤT)

### Cách A: Expo Go (dễ nhất, không cần cài gì thêm)
1. Tải app **Expo Go** từ App Store hoặc Play Store
2. Mở Expo Go → quét QR code trên Terminal
3. App load lên ngay!

### Cách B: Simulator (cần Mac cho iOS)
```bash
# iOS Simulator (chỉ Mac)
npx expo start --ios

# Android Emulator (cần Android Studio)
npx expo start --android
```

---

## BƯỚC 4 — Thêm assets (icon + splash)

Tạo thư mục `assets/` và thêm:
- `icon.png` — 1024×1024px (logo app)
- `splash.png` — 1284×2778px (màn hình loading)
- `adaptive-icon.png` — 1024×1024px (Android)

Màu nền splash: `#0e0c1a` (đã config sẵn trong app.json)

---

## BƯỚC 5 — Build để submit lên stores

### 5.1 Tạo tài khoản Expo
```bash
eas login
# hoặc tạo tại expo.dev
```

### 5.2 Config EAS
```bash
eas build:configure
```

File `eas.json` sẽ tự tạo. Nội dung mẫu:
```json
{
  "build": {
    "preview": {
      "android": { "buildType": "apk" }
    },
    "production": {}
  }
}
```

---

## BƯỚC 6 — Submit lên Google Play Store

### 6.1 Tạo tài khoản Google Play Console
- Vào https://play.google.com/console
- Phí một lần: **$25 USD**
- Điền thông tin → xác minh danh tính

### 6.2 Build file Android (.aab)
```bash
eas build --platform android --profile production
```
Đợi khoảng 10-15 phút → EAS gửi link tải file .aab

### 6.3 Upload lên Play Console
1. Play Console → **Create app**
2. Điền: App name "Lore", ngôn ngữ, loại app
3. **Production** → Create new release → Upload file .aab
4. Điền: Release notes, mô tả app
5. Screenshots: chụp từ Expo Go hoặc Simulator (cần ít nhất 2 ảnh)
6. Content rating: điền form
7. **Submit for review** → đợi 1-3 ngày

---

## BƯỚC 7 — Submit lên App Store (cần Mac + $99/năm)

### 7.1 Đăng ký Apple Developer
- Vào https://developer.apple.com
- Phí: **$99 USD/năm**

### 7.2 Config bundle ID
Trong `app.json`, đổi:
```json
"bundleIdentifier": "com.yourname.loreapp"
```
(phải unique, ví dụ: `com.annadinh.loreapp`)

### 7.3 Build file iOS (.ipa)
```bash
eas build --platform ios --profile production
```

### 7.4 Upload lên App Store Connect
```bash
eas submit --platform ios
```
Hoặc dùng **Transporter** app (Mac App Store) để upload thủ công.

### 7.5 Trong App Store Connect
1. https://appstoreconnect.apple.com
2. **My Apps** → **+** → New App
3. Điền: name, bundle ID, SKU
4. Screenshots: cần ảnh cho iPhone 6.5" và 5.5"
5. Mô tả, keywords, category
6. **Submit for Review** → đợi 1-7 ngày

---

## Tips quan trọng

**Đổi bundle ID trước khi submit:**
```json
// app.json
"bundleIdentifier": "com.yourname.loreapp",  ← iOS
"package": "com.yourname.loreapp"             ← Android
```
Phải là unique trên toàn thế giới!

**Test kỹ trước khi submit:**
- Chạy trên iPhone thật + Android thật
- Test tất cả flows: add item, view detail, tạo board
- Check dark mode, different screen sizes

**Screenshots đẹp:**
- Dùng https://shots.so hoặc https://mockuphone.com
- Upload ảnh chụp app → wrap vào mockup phone đẹp
- App Store cần 3-5 screenshots mỗi size

---

## Lỗi thường gặp

```bash
# Lỗi: Unable to resolve module
npm install   # chạy lại

# Lỗi: Font not loaded  
npx expo install @expo-google-fonts/syne @expo-google-fonts/space-grotesk

# Lỗi: Metro bundler
npx expo start --clear   # clear cache

# Lỗi: Android build fail
eas build --platform android --clear-cache
```

---

## Screens hoàn chỉnh trong app

| Screen | Đường dẫn | Mô tả |
|--------|-----------|-------|
| Home | `/` | Feed chính, masonry films, book shelf, music |
| Search | `/search` | Tìm kiếm + filter theo loại |
| Add Item | `/add` | Thêm film/book/music/etc |
| Item Detail | `/item/[id]` | Xem + edit chi tiết, tags, notes |
| Library | `/library` | Full list có filter |
| Boards | `/boards` | Lore Boards, tạo board mới |
| Profile | `/profile` | Stats, taste breakdown, recent thoughts |

---

Made with ˖°✦ by Lore
