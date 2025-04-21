import React from "react";
import { MdErrorOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="notfound-wrapper">
      <div className="notfound-content">
        <div className="notfound-icon">
          <MdErrorOutline size={72} color="#F44336" />
        </div>
        <h1 className="notfound-title">Error 404</h1>
        <p className="notfound-message">
          The page you're looking for was not found.
        </p>
        <Link to="/" className="notfound-button">
          Go back to homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;