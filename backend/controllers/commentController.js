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

const likeComment = handleAsync(async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  const comment = await Comment.findById(id);

  if (!comment) {
    res.status(404);
    throw new Error("Comment not found");
  }

  if (comment.likes.includes(user._id)) {
    return res.status(400).json({ message: "User already liked this comment" });
  }

  comment.likes.push(user._id);
  await comment.save();

  res.json(comment);
});

const dislikeComment = handleAsync(async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  const comment = await Comment.findById(id);

  if (!comment) {
    res.status(404);
    throw new Error("Comment not found");
  }

  if (comment.dislikes.includes(user._id)) {
    return res
      .status(400)
      .json({ message: "User already disliked this comment" });
  }

  comment.dislikes.push(user._id);
  await comment.save();

  res.json(comment);
});

const removeLike = handleAsync(async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  const comment = await Comment.findById(id);

  if (!comment) {
    res.status(404);
    throw new Error("Comment not found");
  }

  if (!comment.likes.includes(user._id)) {
    return res.status(400).json({ message: "User has not liked this comment" });
  }

  comment.likes = comment.likes.filter(
    (likeId) => likeId.toString() !== user._id.toString()
  );
  await comment.save();

  res.json(comment);
});

const removeDislike = handleAsync(async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  const comment = await Comment.findById(id);

  if (!comment) {
    res.status(404);
    throw new Error("Comment not found");
  }

  if (!comment.dislikes.includes(user._id)) {
    return res
      .status(400)
      .json({ message: "User has not disliked this comment" });
  }

  comment.dislikes = comment.dislikes.filter(
    (dislikeId) => dislikeId.toString() !== user._id.toString()
  );
  await comment.save();

  res.json(comment);
});

export {
  createComment,
  editComment,
  getCommentsByPostId,
  deleteComment,
  likeComment,
  dislikeComment,
  removeLike,
  removeDislike,
};
