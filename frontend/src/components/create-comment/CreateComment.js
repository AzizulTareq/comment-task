import React, { useState } from "react";
import { useCreateCommentMutation } from "../../slices/commentsApiSlice";
import "./CreateComment.scss";
import { toast } from "react-toastify";

const CreateComment = ({ postId }) => {
  const [text, setText] = useState("");
  const [createComment, { isLoading }] = useCreateCommentMutation();

  const handleCreateComment = async (e) => {
    e.preventDefault();
    try {
      await createComment({ postId, text }).unwrap();
      setText("");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <div>
      <div>
        <textarea
          onChange={(e) => setText(e.target.value)}
          value={text}
          className="comment-input"
        />
      </div>
      <div>
        <button
          className={`post-button ${isLoading ? "disabled" : ""}`}
          onClick={handleCreateComment}
          disabled={isLoading}
        >
          {isLoading ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
};

export default CreateComment;
