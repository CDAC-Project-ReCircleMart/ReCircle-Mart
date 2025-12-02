olx-clone/
├─ backend/
│  ├─ package.json
│  ├─ server.js
│  ├─ .env.example
│  ├─ config/
│  │  └─ db.js
│  ├─ models/
│  │  ├─ index.js
│  │  ├─ user.js
│  │  ├─ listing.js
│  │  └─ message.js
│  ├─ routes/
│  │  ├─ auth.js
│  │  ├─ listings.js
│  │  └─ admin.js
│  ├─ controllers/
│  │  ├─ authController.js
│  │  ├─ listingController.js
│  │  └─ adminController.js
│  ├─ middlewares/
│  │  ├─ auth.js
│  │  └─ admin.js
│  └─ uploads/  (for images)

└─ frontend/
   ├─ package.json
   ├─ vite.config.js
   ├─ .env.example
   ├─ src/
   │  ├─ main.jsx
   │  ├─ App.jsx
   │  ├─ api/
   │  │  └─ api.js
   │  ├─ pages/
   │  │  ├─ Home.jsx
   │  │  ├─ Login.jsx
   │  │  ├─ Register.jsx
   │  │  ├─ ListingCreate.jsx
   │  │  ├─ ListingDetail.jsx
   │  │  ├─ Dashboard.jsx
   │  │  └─ AdminDashboard.jsx
   │  ├─ components/
   │  │  ├─ Header.jsx
   │  │  └─ Chat.jsx
   │  └─ styles/
   └─ public/