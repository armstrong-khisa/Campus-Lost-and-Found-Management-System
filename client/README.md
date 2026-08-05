# 🖥️ Campus Lost & Found — Frontend (React Client)

This is the frontend application for the **Campus Lost and Found Management System**. It is a modern, responsive single-page application built with React and Vite, styled with Tailwind CSS, and powered by the Flask API backend.

---

## 🧰 Tech Stack

- **React 19** — UI library
- **Vite 8** — build tool and dev server
- **Tailwind CSS 4** — utility-first styling
- **React Router 7** — client-side routing
- **lucide-react** — icon library
- **Vite plugin** — React + Tailwind via `@vitejs/plugin-react` and `@tailwindcss/vite`

---

## 📁 Project Structure

```text
client/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── eslint.config.js
├── .prettierrc
├── public/
│   └── logo.png
└── src/
    ├── main.jsx                 # entry point (BrowserRouter + AuthProvider)
    ├── App.jsx                  # routes + global layout (Navbar, Footer, modals)
    ├── index.css                # global styles (Tailwind)
    ├── assets/                  # static assets
    ├── components/              # reusable UI components
    ├── context/
    │   └── AuthContext.jsx      # global authentication state
    ├── services/
    │   ├── api.js               # fetch wrapper with JWT auth
    │   └── auth.js              # auth helpers (login, logout, token)
    └── pages/
        ├── Home.jsx             # landing page
        ├── About.jsx            # about page
        ├── Items.jsx            # browse + search/filter items
        ├── ItemDetails.jsx      # single item detail + claim
        ├── Dashboard.jsx        # user dashboard (protected)
        ├── AdminDashboard.jsx   # admin dashboard (protected)
        ├── NotFound.jsx         # 404 page
        └── admin/               # admin sub-pages
            ├── Users.jsx
            ├── Items.jsx
            ├── Claims.jsx
            └── Categories.jsx
```

---

## 🗺️ Routing

| Route | Page | Access |
| --- | --- | --- |
| `/` | Home | Public |
| `/about` | About | Public |
| `/items` | Browse Items | Public |
| `/items/:id` | Item Details | Public |
| `/dashboard` | User Dashboard | Authenticated (`ProtectedRoute`) |
| `/admin` | Admin Dashboard | Admin only (`AdminRoute`) |
| `*` | NotFound | Public |

---

## 🧩 Components

| Component | Purpose |
| --- | --- |
| `Navbar` | Sticky glassmorphism header with nav links, Report Item & Sign In actions, and dynamic Dashboard link based on role |
| `Footer` | Brand, quick links, categories, and contact information |
| `AuthModal` | Login / Register modal with validation and role-based redirect |
| `ReportItemModal` | Modal for reporting lost/found items (category, location, date, description, image URL) |
| `ClaimItemModal` | Modal for submitting an ownership claim with message and item preview |
| `ItemCard` | Reusable card for displaying item summaries |
| `ProtectedRoute` | Redirects unauthenticated users to `/` |
| `AdminRoute` | Redirects non-admins to `/dashboard` |

---

## 🗄️ State & Services

- **`AuthContext`** — Provides `user`, `token`, `login`, `register`, `logout`, and `isLoggedIn` across the app. Persists the user and token in `localStorage`.
- **`services/api.js`** — A thin `fetch` wrapper that:
  - prepends the base URL
  - attaches the `Authorization: Bearer <token>` header when a token exists
  - clears stale credentials and redirects to `/` on a `401`
  - throws meaningful error messages from the backend
- **`services/auth.js`** — Helper functions for login, register, logout, token retrieval, and refreshing the current user.

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the dev server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the next available port).

### 3. Build for production

```bash
npm run build
```

### 4. Preview the production build

```bash
npm run preview
```

### 5. Lint

```bash
npm run lint
```

---

## 🔌 API Integration

The frontend communicates with the Flask backend using a single base URL configured in `src/services/api.js`:

```js
const BASE_URL = 'https://campus-lost-and-found-management-system.onrender.com/';
```

To point the client at a local backend during development, update `BASE_URL` to your local server (e.g., `http://127.0.0.1:3000/`).

The app uses JWT authentication. On login, the token and user object are stored in `localStorage` under the keys `token` and `user`. Logged-in users can report items, submit claims, and access their dashboard. Admins can manage users, items, claims, and categories.

---

## 📝 Scripts

| Script | Description |
| --- | --- |
| `dev` | Start the Vite dev server |
| `build` | Create a production build |
| `lint` | Run ESLint |
| `preview` | Preview the production build locally |

---

## 📄 License

Part of the Campus Lost and Found Management System (MIT License).
