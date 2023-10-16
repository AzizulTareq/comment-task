import { useParams } from "react-router-dom";
import { posts } from "../../postsData/postsData";

const PostDetails = () => {
  const { id } = useParams();
  console.log(id);
  const post = posts.find((post) => post.id == id);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <h2>{post?.title}</h2>
      <p>{post?.content}</p>
    </div>
  );
};

export default PostDetails;
