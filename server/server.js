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

//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.get('/', (req, res)=> {
    res.send("Welcome to QuickBlog API");
})
app.use('/api/admin', adminRoutes);
app.use('/api/blog', blogRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})

export default app;
