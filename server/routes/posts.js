import express from 'express';
import { createPost ,getPosts, getPost, updatePost, deletePost, LikePost } from '../controllers/post.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

router.post('/',verifyToken , createPost);
router.get('/', getPosts);
router.get('/:id', getPost);
router.patch('/:id/edit', verifyToken, updatePost);
router.delete('/:id', verifyToken, deletePost);
router.patch('/:id/like', verifyToken, LikePost);

export default router;

