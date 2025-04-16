import React from "react";
import { FaBrain } from "react-icons/fa";
import { GiLightningArc } from "react-icons/gi";
import "./UnderConstruction.css";

const UnderConstruction = () => {
  return (
    <>
      <div className="under-construction-wrapper">
        <div className="under-construction-content">
          <div className="under-construction-icon overloaded-brain">
            <FaBrain size={80} color="var(--primary-color)" />
            <GiLightningArc size={40} color="var(--accent-color)" className="lightning-effect" />
          </div>
          <h1 className="under-construction-title">Cognitive Overload</h1>
          <p className="under-construction-message">
            Our neurons are firing non-stop to bring you something incredible. Please check back later!
          </p>
          <a href="/" className="under-construction-button">
            <i className="fa fa-arrow-left" style={{ marginRight: "8px" }}></i>
            Go Back
          </a>
        </div>
      </div>
    </>
  );
};

export default UnderConstruction;