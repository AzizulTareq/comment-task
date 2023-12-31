import express from "express";
import {
  createComment,
  editComment,
  getCommentsByPostId,
  deleteComment,
  likeComment,
  dislikeComment,
  removeLike,
  removeDislike,
  getCommentsWithMostLikes,
  getCommentsWithMostDislikes,
  getCommentsMostRecent,
} from "../controllers/commentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createComment);
router.put("/update/:id", protect, editComment);
router.get("/post/:postId", protect, getCommentsByPostId);
router.delete("/delete/:id", protect, deleteComment);

router.post("/like/:id", protect, likeComment);
router.post("/dislike/:id", protect, dislikeComment);
router.post("/remove-like/:id", protect, removeLike);
router.post("/remove-dislike/:id", protect, removeDislike);

router.get("/most-likes", getCommentsWithMostLikes);
router.get("/most-dislikes", getCommentsWithMostDislikes);
router.get("/most-recent", getCommentsMostRecent);

export default router;
