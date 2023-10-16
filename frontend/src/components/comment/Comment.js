import React, { useState, useEffect } from "react";
import "./Comment.scss";
import { AiFillLike, AiFillDislike, AiFillDelete } from "react-icons/ai";
import { BiLike, BiDislike } from "react-icons/bi";
import {
  useReactCommentMutation,
  useRemoveReactMutation,
} from "../../slices/commentsApiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Comment = ({ data }) => {
  console.log(data);
  const { userInfo } = useSelector((state) => state.auth);
  const [currentUserLiked, setCurrentUserLiked] = useState(false);
  const [currentUserDisliked, setCurrentUserDisliked] = useState(false);
  const [noReactionFromCurrentUser, setNoReactionFromCurrentUser] =
    useState(true);

  useEffect(() => {
    for (const reaction of data.reactions) {
      if (reaction.user === userInfo._id) {
        if (reaction.reactionType === "like") {
          setCurrentUserLiked(true);
          setNoReactionFromCurrentUser(false);
        } else if (reaction.reactionType === "dislike") {
          setCurrentUserDisliked(true);
          setNoReactionFromCurrentUser(false);
        }
      }
    }
  }, [data.reactions, userInfo._id]);

  const [reactComment] = useReactCommentMutation();
  const [removeReact] = useRemoveReactMutation();
  const likeCount = data?.reactions.filter(
    (reaction) => reaction.reactionType === "like"
  ).length;
  const dislikeCount = data?.reactions.filter(
    (reaction) => reaction.reactionType === "dislike"
  ).length;

  const likeComment = async (id, type) => {
    try {
      await reactComment({ id, type });
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleRemoveReact = async (id) => {
    try {
      await removeReact({ id });
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div>
      <div className="comment-container">
        <div className="comment-delete">
          <div className="username">{data?.user?.name}</div>
          {data?.user?._id === userInfo?._id && (
            <AiFillDelete className="reaction-icon-delete" size={18} />
          )}
        </div>

        <div>{data?.text}</div>
        <div className="reactions">
          <div className="likes">{likeCount} Likes</div>
          <div className="dislikes">{dislikeCount} Dislikes</div>
          <div className="reactions-list">
            {currentUserLiked && (
              <div>
                <AiFillLike
                  className="reaction-icon"
                  onClick={() => handleRemoveReact(data?._id.toString())}
                  size={20}
                />{" "}
                Liked
              </div>
            )}

            {currentUserDisliked && (
              <div className="reaction-container">
                <AiFillDislike
                  className="reaction-icon"
                  onClick={() => handleRemoveReact(data?._id.toString())}
                  size={20}
                />
                <span className="reaction-text">Disliked</span>
              </div>
            )}

            {noReactionFromCurrentUser && (
              <div className="reaction-container">
                <BiLike
                  className="reaction-icon"
                  onClick={() => likeComment(data?._id.toString(), "like")}
                  size={20}
                />
                <BiDislike
                  className="reaction-icon"
                  onClick={() => likeComment(data?._id.toString(), "dislike")}
                  size={20}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
