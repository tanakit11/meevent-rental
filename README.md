# MEevent Rental — Vite + React

โปรเจกต์นี้แปลงจาก `test2.html` ไฟล์เดียว มาเป็นโครงสร้าง Vite + React

## โครงสร้างโปรเจกต์

```
meevent-rental/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── data/
    │   └── initialData.js       # ข้อมูลเริ่มต้น (สินค้า, หมวดหมู่)
    └── components/
        ├── Navbar.jsx
        ├── HomePage.jsx
        ├── LoginPage.jsx
        ├── AdminPage.jsx
        ├── ProductCard.jsx
        ├── ProductModal.jsx
        └── Toast.jsx
```

## วิธีรัน

```bash
npm install
npm run dev
```

## วิธี Build

```bash
npm run build
npm run preview
```

## การล็อกอิน Admin

- Username: `admin`
- Password: `admin1234`
