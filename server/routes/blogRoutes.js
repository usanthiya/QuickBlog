import express from 'express';
import { addBlog } from '../controllers/blogController.js';
import upload from '../middleware/multer.js';
const router = express.Router();

router.route('/add').post(upload.single('image'), addBlog);

export default router;