import express from 'express';
import { addBlog, addComment, deleteBlogById, getAllBlogs, getBlogById, getBlogComments, togglePublish } from '../controllers/blogController.js';
import upload from '../middleware/multer.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.route('/add').post(auth, upload.single('image'), addBlog);
router.route('/').get(auth, getAllBlogs);
router.route('/:id').get(auth, getBlogById);
router.route('/:id').delete(auth, deleteBlogById);
router.route('/toggle-publish').post(auth, togglePublish);
router.route('/add-comments').post(addComment);
router.route('/comments').post(getBlogComments);

export default router;