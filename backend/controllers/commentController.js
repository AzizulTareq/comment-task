// commentController.js
import handleAsync from "../middleware/handleAsync.js";
import Comment from "../models/commentModel.js";

const createComment = handleAsync(async (req, res) => {
  const { postId, text } = req.body;
  const user = req.user;

  const comment = await Comment.create({
    postId,
    text,
    user: user._id,
  });

  res.status(201).json(comment);
});

const editComment = handleAsync(async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  const comment = await Comment.findById(id);

  if (!comment) {
    res.status(404);
    throw new Error("Comment not found");
  }

  comment.text = text;
  const updatedComment = await comment.save();
  res.json(updatedComment);
});

const getCommentsByPostId = handleAsync(async (req, res) => {
  const { postId } = req.params;

  const comments = await Comment.find({ postId }).populate("user", "name");

  res.json(comments);
});

const deleteComment = handleAsync(async (req, res) => {
  const { id } = req.params;

  try {
    const comment = await Comment.findByIdAndDelete(id);

    if (!comment) {
      res.status(404);
      throw new Error("Comment not found");
    }

    await Comment.deleteOne({ _id: id });
    res.json({ message: "Comment removed" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting comment", error: error.message });
  }
});

export { createComment, editComment, getCommentsByPostId, deleteComment };
