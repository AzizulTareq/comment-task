import React from "react";
import { Link } from "react-router-dom";
import { posts } from "../../postsData/postsData";
import { useSelector } from "react-redux";
import "./Home.scss";

const Home = () => {
  const { userInfo } = useSelector((state) => state.auth);
  console.log("from home", userInfo);
  return (
    <div>
      <div className="container">
        {userInfo &&
          posts.map((post) => (
            <Link to={`/page/${post.id}`} key={post.id}>
              <div className="page">Page {post.id}</div>
            </Link>
          ))}

        {!userInfo && (
          <div>
            <div className="message">
              Please Create an Account or Login to view the functionalities
            </div>
            <div className="techstack">
              <div>Tech Stack Used In This Project</div>
              <ul>
                <li>Node.js</li>
                <li>Express</li>
                <li>React.js</li>
                <li>Redux Toolkit</li>
                <li>Scss (I'm not good at scss)</li>
                <li>MongoDB</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
