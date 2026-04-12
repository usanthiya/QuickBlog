import express from 'express';
import { signup, login, getAllBlogsAdmin, getAllComments, deleteCommentById, approveCommentById, getDashboardData } from '../controllers/adminController.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/blogs').get(auth, getAllBlogsAdmin);
router.route('/comments').get(auth, getAllComments);
router.route('/delete-comment').post(auth, deleteCommentById);
router.route('/approve-comment').post(auth, approveCommentById);
router.route('/dashboard').get(auth, getDashboardData);

export default router;