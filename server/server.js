import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { PORT } from "./config/env.js";
const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.get('/', (req, res)=> {
    res.send("Welcome to QuickBlog API");
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})

export default app;
