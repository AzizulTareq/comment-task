import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser).get(protect);
router.post('/auth', authUser);
router.post('/logout', logoutUser);


export default router;