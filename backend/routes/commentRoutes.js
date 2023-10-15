import express from "express";
import {
  createComment,
  editComment,
  deleteComment,
} from "../controllers/commentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createComment);
router.put("/update/:id", protect, editComment);
router.delete("/delete/:id", protect, deleteComment);

export default router;
