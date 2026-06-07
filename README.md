# 🔐 Sign‑Up / Login System (Next.js + MySQL + Typescript)

A simple, Persian‑language authentication system built with **Next.js**, **Tailwind CSS**, and a **MySQL** database.  
Includes sign‑up, login, and a dashboard page – all connected to a remote MySQL instance.

![Next.js](https://img.shields.io/badge/Next.js-15.1-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.3-blue)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Features

- Persian (RTL) user interface with clean Tailwind styling.
- Sign‑up form (name, email, password, confirm password).
- Login form (username or email + password).
- Client‑side and server‑side validation.
- Passwords hashed with `bcryptjs`.
- API routes (`/api/signup`, `/api/login`) for authentication.
- Dashboard page displaying user data and dummy stats.
- Animations (fade‑in, slide‑up) without external libraries.
- Fully responsive design.

---

## 🛠 Tech Stack

| Frontend  | Backend (API) | Database | Others |
|-----------|---------------|----------|--------|
| Next.js (App Router) | Next.js API routes | MySQL | bcryptjs, mysql2 |
| React (TypeScript) | | | Tailwind CSS |
| Tailwind CSS | | | |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- MySQL server (local via Laragon, XAMPP, or a remote host)

### Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/Hosein-rad/signup-login.git
   cd signup-login
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   create a `.env.local` file in the root:
   ```text
   DB_HOST=localhost          # or your remote DB host
   DB_USER=root
   DB_PASSWORD=               # leave empty for local Laragon, or set your password
   DB_NAME=signinup           # or your database name
   ```

4. **Create the database table**
  Run this SQL on your MySQL server:
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) COLLATE utf8mb4_persian_ci NOT NULL UNIQUE,
  email VARCHAR(255) COLLATE utf8mb4_persian_ci NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY (email(191))
) ENGINE=InnoDB COLLATE utf8mb4_persian_ci;
```
5. **Start the development server**
  ```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---
## 📁 Project Structure
signup-login/
├── app/
│   ├── api/
│   │   ├── signup/route.ts      # Sign‑up API
│   │   └── login/route.ts       # Login API
│   ├── dashboard/page.tsx       # Dashboard after login
│   ├── login/page.tsx           # Login form
│   ├── signup/page.tsx          # Sign‑up form
│   └── page.tsx                 # Home page (two buttons)
├── lib/
│   └── db.ts                    # MySQL connection pool (mysql2)
├── .env.local.example           # Example env file
├── package.json
└── README.md

---
## 🌍 Deployment
This project is ready to deploy on Vercel (or any Node.js host).
Make sure to set the production environment variables in your hosting dashboard (e.g., Vercel):
```text
DB_HOST=your-db-host.com
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=your-db-name
```
Also, ensure your MySQL server allows remote connections (or use a cloud database like PlanetScale, TiDB, or FreeSQLDatabase).
---

## 🚧 Coming Soon / To Be Developed

| Feature | Description |
|---------|-------------|
| 🔐 **JWT Authentication** | Token‑based auth with access & refresh tokens for secure session management |
| 🍪 **Session Handling** | HTTP‑only cookies or localStorage persistence to keep users logged in |
| 🎨 **Enhanced UI/UX** | Animated form validations, loading skeletons, toast notifications, and micro‑interactions |
| 👤 **Profile Page** | Editable user profile with avatar upload and personal info management |
| 🔑 **Password Reset** | Forgot password flow with email‑based reset links |
| 📧 **Email Verification** | Verify new accounts via a confirmation email |
| 🌙 **Dark Mode** | Full light/dark theme toggle with system preference detection |
| 🌐 **i18n Support** | Multi‑language support (English, Persian, etc.) |
| 📱 **PWA Ready** | Installable as a Progressive Web App with offline support |
| 🛡 **Rate Limiting** | API protection against brute‑force attacks on login/signup |
| 📊 **Admin Panel** | User management dashboard with search, filter, and role assignment |
| 🧪 **Unit & E2E Tests** | Jest + React Testing Library + Playwright for full test coverage |
---
## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [mysql2](https://www.npmjs.com/package/mysql2)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [FreeSQLDatabase](https://www.freesqldatabase.com/)
