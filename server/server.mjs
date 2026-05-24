import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
import { PORT } from "./config/env.js";
import connectDb from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import blogRoutes from './routes/blogRoutes.js';

const app = express();

await connectDb();

// Middlewares
app.use(cors());
app.use(express.json());

// Netlify path rewrite middleware
app.use((req, res, next) => {
  if (req.url.startsWith('/.netlify/functions/api')) {
    req.url = req.url.replace('/.netlify/functions/api', '');
  }
  next();
});

// Routes
app.get('/', (req, res) => {
  res.send("Welcome to QuickBlog API");
});
app.use('/api/admin', adminRoutes);
app.use('/api/blog', blogRoutes);

if (!process.env.NETLIFY) {
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
}

export default app;
