import React from "react";
import { Link } from "react-router-dom";
import { posts } from "../postsData/postsData";

const Home = () => {
  return (
    <div>

      {posts.map((post) => (
        <Link to={`/page/${post.id}`} key={post.id}>
          Page {post.id}
        </Link>
      ))}
    </div>
  );
};

export default Home;
