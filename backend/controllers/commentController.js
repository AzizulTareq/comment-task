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


export { createComment };
