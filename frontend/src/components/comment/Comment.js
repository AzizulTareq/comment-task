import React from "react";
import "./Comment.scss";

const Comment = ({ data }) => {
  console.log(data);
  return (
    <div>
      <div className="comment-container">
        <div className="username">{data?.user?.name}</div>
        <div>{data?.text}</div>
        <div className="reactions">
          <div className="likes">{data?.likes?.length} Likes</div>
          <div className="dislikes">{data?.dislikes?.length} Dislikes</div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
