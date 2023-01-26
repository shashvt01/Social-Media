import express from "express";
import { addComment, deleteComment, getComments, updateComment } from "../controllers/comments.js";
import { verifyToken } from "../verifyToken.js";


const router = express.Router();

router.post('/:id', addComment);
router.delete('/:id',verifyToken, deleteComment);
router.get('/:postId', verifyToken,getComments);
router.patch('/:id/edit', verifyToken,updateComment);


export default router;

