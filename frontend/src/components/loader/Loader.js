import React from "react";
import "./Loader.scss";

const Loader = () => {
  return (
    <div className="loader-container">
      <img className="loader" src="/images/loading.gif" alt="Loading" />
    </div>
  );
};

export default Loader;
