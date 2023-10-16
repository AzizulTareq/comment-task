import React from "react";
import { Link } from "react-router-dom";
import { posts } from "../../postsData/postsData";
import { useSelector } from "react-redux";
import "./Home.scss";

const Home = () => {
  const { userInfo } = useSelector((state) => state.auth);
  console.log("from home", userInfo);
  return (
    <div className="container">
      {userInfo &&
        posts.map((post) => (
            <Link to={`/page/${post.id}`} key={post.id}>
              <div className="page">Page {post.id}</div>
            </Link>
        ))}
        {!userInfo && (
          <div className="message">
            Please Create an Account or Login to view the functionalities
          </div>
        )}
    </div>
  );
};

export default Home;
