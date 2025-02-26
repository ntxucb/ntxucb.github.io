import React from "react";
import { TaskBar } from "../../components/layout/TaskBar/TaskBar";
import Footer from "../../components/layout/Footer/Footer";
import { FaTools } from 'react-icons/fa'; 
import "./UnderConstruction.css";

const UnderConstruction = () => {
  return (
    <>

      <div className="forbidden-container">
        <div className="forbidden-content">
          <div className="forbidden-icon">
            <FaTools size={80} color="#FE8A9F" /> 
          </div>
          <h1 className="forbidden-title">🚧</h1>
          <h2 className="forbidden-subtitle">Page Under Construction</h2>
          <p className="forbidden-message">
            Sorry, we are working on something amazing. Come back soon!
          </p>
          <a href="https://ntxucb.github.io/ntxucblapaz.github.io" className="back-button">
            <i className="fa fa-arrow-left"></i> 
            Go Back
          </a>
        </div>
      </div>

    </>
  );
};

export default UnderConstruction;