# QuickBlog ✍️

A full-stack blogging platform built with **React**, **Node.js/Express**, and **MongoDB**. QuickBlog lets readers browse and comment on posts, while admins manage the entire blog from a dedicated dashboard — including AI-assisted blog generation.

---

## ✨ Features

### Public
- 📖 Browse and read blog posts
- 💬 Leave comments on posts
- 🏷️ Browse posts by category

### Admin
- 🔐 Secure JWT-based authentication (login & signup)
- ✍️ Create, edit, and publish/unpublish blog posts with rich text (CKEditor / Quill)
- 🖼️ Upload cover images via **ImageKit**
- 📋 List and manage all blogs
- 🗨️ View, approve, and delete comments
- 👥 Manage user accounts
- 📊 Dashboard with analytics overview
- 🤖 AI-assisted blog content generation

---

## 🛠️ Tech Stack

| Layer      | Technology                                                                 |
|------------|----------------------------------------------------------------------------|
| Frontend   | React 19, Vite, Tailwind CSS v4, Redux Toolkit, React Router v7            |
| UI / UX    | Lucide React icons, React Toastify, Framer Motion                          |
| Rich Text  | CKEditor 5, Quill                                                          |
| Backend    | Node.js, Express 5                                                         |
| Database   | MongoDB (Mongoose)                                                         |
| Auth       | JWT + bcryptjs                                                             |
| Storage    | ImageKit (image CDN)                                                       |
| Deployment | Netlify (frontend + serverless functions)                                  |

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm v9+
- A MongoDB connection string (e.g., [MongoDB Atlas](https://www.mongodb.com/atlas))
- An [ImageKit](https://imagekit.io/) account for image uploads

### 1. Clone the repository

```bash
git clone https://github.com/your-username/QuickBlog.git
cd QuickBlog
```

### 2. Install dependencies

```bash
# Install all workspace dependencies from root
npm install
```

### 3. Configure environment variables

**Server** — create `server/.env`:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# ImageKit credentials
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
```

**Client** — create `client/.env`:

```env
VITE_API_BASE_URL=http://localhost:4000
```

### 4. Run in development

Open two terminals:

```bash
# Terminal 1 — Start the backend
cd server
npm run dev

# Terminal 2 — Start the frontend
cd client
npm run dev
```

The client will be available at `http://localhost:5173` and the API at `http://localhost:4000`.

---

## 🌐 Deploying to Netlify

This project is configured for Netlify with the backend served as serverless functions.

```bash
# Build the client from the repo root
npm run build:client
```

The `netlify.toml` config:
- Builds the client with `npm run build:client` → output in `client/dist`
- Serves backend from `server/functions/` as Netlify Functions
- Rewrites `/api/*` requests to `/.netlify/functions/api/*`

Push to your connected GitHub repo and Netlify will deploy automatically.

---

## 🔌 API Reference

### Blog Routes (`/api/blog`)

| Method | Endpoint            | Auth | Description                 |
|--------|---------------------|------|-----------------------------|
| GET    | `/`                 | ❌   | Get all published blogs     |
| GET    | `/:id`              | ❌   | Get a single blog by ID     |
| POST   | `/add`              | ✅   | Create a new blog post      |
| DELETE | `/:id`              | ✅   | Delete a blog post          |
| POST   | `/toggle-publish`   | ✅   | Toggle publish status       |
| POST   | `/add-comments`     | ❌   | Submit a comment            |
| POST   | `/comments`         | ❌   | Get comments for a blog     |

### Admin Routes (`/api/admin`)

| Method | Endpoint              | Auth | Description                   |
|--------|-----------------------|------|-------------------------------|
| POST   | `/signup`             | ❌   | Register a new admin          |
| POST   | `/login`              | ❌   | Login and receive JWT         |
| GET    | `/blogs`              | ✅   | Get all blogs (admin view)    |
| POST   | `/blogs/generate`     | ✅   | AI-generate blog content      |
| GET    | `/comments`           | ✅   | Get all comments              |
| POST   | `/delete-comment`     | ✅   | Delete a comment              |
| POST   | `/approve-comment`    | ✅   | Approve a comment             |
| GET    | `/dashboard`          | ✅   | Get dashboard analytics       |
| GET    | `/users`              | ✅   | List all users                |
| PUT    | `/users/:id`          | ✅   | Update a user                 |

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).
