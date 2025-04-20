import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Projects.css";
import { ongoingProjects } from "../../assets/data/projects";
import CardEvent from "../../components/common/CardEvent/CardEvent";
import CardMainEvent from "../../components/common/CardMainEvent/CardMainEvent";
import { eventsData } from "../../assets/data/events";
import squared_placeholder from "../../assets/images/placeholder-cuadrado.jpg";
import BrainAwarenessWeekLogo from "../../assets/logos/Brain-Awareness-Week-logo-color-rgb.png";
import DanaFoundationLogo from "../../assets/logos/Dana_Logo-1.png";
import IBROLogo from "../../assets/logos/IBRO_logo_main_RGB_1000.png";
import NeurotechUmsaLogo from "../../assets/logos/Logo actual.jpg";
import { organizersData } from "../../assets/data/organizers";
import portraitPlaceholder from "../../assets/images/Portrait_Placeholder.png";
import FeatureCard from "../../components/common/FeatureCard/FeatureCard";
import styles from "../Home/Home.module.css";
import pbackgorund from "../../assets/images/project_background.png"

export const Projects = () => {
  const navigate = useNavigate();
  const leadIdsToExclude = [48, 49];

  const handleEventClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <div className="container">
      { (
        <>
          <h2 className="title-section">Our Projects</h2>
          <h4 className="title-description">At NeurotechUCB, we drive innovation at the intersection of neuroscience and technology. Our projects combine AI, data analysis, and neurocognition to create impactful solutions in health, education, and industry.</h4>
          <div className="main-image-container">
            <img src={pbackgorund} alt="Group of people working"/>
          </div>
        </>
      )}
      

      <div className={styles["section-container--row"]} id="philosophy">
        <FeatureCard
          number={ongoingProjects.length}
          title="Ongoing Projects"
        />

        <FeatureCard
          number={ongoingProjects.length}
          title="Completed Projects"
        />

        <FeatureCard
          number={60}
          title="People Involved"
        />

      </div>

      <div className="completed-container">

      <h2 className="title-section">Ongoing Projects</h2>
      <div className="row">
        <div className = "row-container">
        {ongoingProjects.map((event) => (
          <CardEvent
            key={event.id}
            title={event.title}
            image={event.image}
            description={event.description}
            buttonText={event.buttonText}
            onButtonClick={() => handleEventClick(event.id)}
          />
        ))}
        </div>
      </div>
      </div>
      
      <div style={{height: "100px"}}></div>


      <h2 className="title-section">Completed Projects</h2>
      <div className="row">
        <div className = "row-container">
        {ongoingProjects.map((event) => (
          <CardEvent
          key={event.id}
          title={event.title}
          image={event.image}
          description={event.description}
          buttonText={event.buttonText}
          onButtonClick={() => handleEventClick(event.id)}
          />
        ))}
        </div>
      </div>
      
      <div style={{height: "100px"}}></div>

      <h2 className="title-section">Sponsors</h2>
      <div className="row">
        <div className="colaborador">
          <img src={BrainAwarenessWeekLogo} alt="Brain Awareness Week Logo" />
        </div>
        <div className="colaborador">
          <img src={DanaFoundationLogo} alt="Dana Foundation Logo" />
        </div>
        <div className="colaborador">
          <img src={IBROLogo} alt="IBRO Logo" />
        </div>
      </div>
      <h2 className="title-section">Allied Communities</h2>
      <div className="row">
        <div className="colaborador">
          <img src={NeurotechUmsaLogo} alt="Neurotech UMSA Logo" />
        </div>
      </div>
    </div>
  );
};