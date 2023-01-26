import express from 'express';
import { follow ,getUser,unfollow, getUsers} from '../controllers/User.js';
import { verifyToken } from '../verifyToken.js';


const router = express.Router();

router.get("/:id",getUser);
router.get('/',getUsers);
router.patch("/:id/follow/:userId",verifyToken,follow);
router.patch("/:id/unfollow/:userId",verifyToken,unfollow);


export default router;