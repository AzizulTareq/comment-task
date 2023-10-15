// commentController.js
import handleAsync from '../middleware/handleAsync.js';
import Comment from '../models/commentModel.js';

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
    throw new Error('Comment not found');
  }

  comment.text = text;
  const updatedComment = await comment.save();
  res.json(updatedComment);
});

const deleteComment = handleAsync(async (req, res) => {
  const { id } = req.params;

  const comment = await Comment.findById(id);

  if (!comment) {
    res.status(404);
    throw new Error('Comment not found');
  }

  await comment.remove();
  res.json({ message: 'Comment removed' });
});

export { createComment, editComment, deleteComment };
