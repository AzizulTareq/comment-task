import { useParams } from "react-router-dom";
import { posts } from "../../postsData/postsData";
import { useGetCommentsByPostIdQuery } from "../../slices/commentsApiSlice";
import Loader from "../../components/loader/Loader";
import Comment from "../../components/comment/Comment";
import "./postDetails.scss";
import CreateComment from "../../components/create-comment/CreateComment";

const PostDetails = () => {
  const { id } = useParams();
  const post = posts.find((post) => post.id == id);

  const { data, isLoading, error } = useGetCommentsByPostIdQuery(id);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="post-container">
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div>
            <h2>{post?.title}</h2>
            <p>{post?.content}</p>
          </div>
          <h3>Comments</h3>
          {data.map((data) => (
            <>
              <div key={data.id}>
                <Comment data={data} />
              </div>
            </>
          ))}
          <CreateComment postId={id} />
        </div>
      )}
    </div>
  );
};

export default PostDetails;
