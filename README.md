

T# LINK SHORT – React Frontend

# React + TypeScript + Vite

A **responsive URL shortener web application frontend** built with **React 19**, **TailwindCSS 4**, **MUI 7**, and **TanStack React Query 5**.  
Users can **sign up and log in** via **email or phone**, create up to **100 short URLs per day**, and manage their URLs with **pagination, analytics, and responsive UI**.

---

## Features

- **Authentication**
  - Sign up and log in using **email or phone**.
  - JWT-based authentication (access + refresh tokens).

- **URL Shortening**
  - Logged-in users can **create up to 100 short URLs per day**.
  - Each URL is **automatically listed** on the dashboard.

- **Dashboard**
  - View all shortened URLs with **pagination**.
  - Generate Short Urls.

- **Responsive UI**
  - Built using **TailwindCSS 4** + **MUI 7** for a modern, clean interface.
  - **Framer Motion** for animations.

- **State Management & API Handling**
  - **TanStack React Query 5** for fetching, caching, and state synchronization.
  - **Axios** with interceptors for token refresh.

- **Notifications & Alerts**
  - **SweetAlert2** for modals.
  - **Notistack** for snackbars.

---

## Tech Stack

- **React 19** + **React DOM 19**
- **TailwindCSS 4** + **@mui/material 7** for UI
- **Framer Motion 12** for animations
- **TanStack React Query 5** for data fetching
- **Axios 1.11** for API calls
- **React Router DOM 7** for routing
- **Notistack 3** & **SweetAlert2** for notifications
- **Lucide-React** for icons

---

## Getting Started

### Prerequisites
- Node.js >= 20
- pnpm >= 10 (preferred) or npm/yarn
### Installation
VITE_BACKENT_URL=''
VITE_DAILY_LIMIT=''
### Installation
```bash
# Clone the repository
git clone https://github.com/Minhaj199/TB_ursS_FDE.git
cd TB_ursS_FDE

# Install dependencies
pnpm install
# or
npm install
# or
yarn install
