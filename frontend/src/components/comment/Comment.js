import React from "react";
import "./Comment.scss";
import { useGetCommentsByPostIdQuery } from "../../slices/commentsApiSlice";

const Comment = ({ data }) => {
  return (
    <div>
      <div className="comment-container">
        <div className="username">{data?.user?.name}</div>
        <div>{data?.text}</div>
      </div>
    </div>
  );
};

export default Comment;
