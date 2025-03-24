import React, { useState, useEffect } from "react";
import { TaskBar } from "../../components/layout/TaskBar/TaskBar";
import Footer from "../../components/layout/Footer/Footer";
import gif from "../../assets/logos/NTXUCB_Logo_first_github.gif";
import ntxLogo from "../../assets/logos/NTX_Logo.png"; 
import UIE from "../../assets/logos/UIELogo.png";
import UCB from "../../assets/logos/UCB.png";
import cidimec from "../../assets/logos/cidimec.png";
import backyard from "../../assets/logos/backyardbrains.png";
import tinyml from "../../assets/logos/tinyml.png";
import openbci from "../../assets/logos/openbci.png";
import "./Home.css";

export const Home = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <TaskBar className="task-bar" />
      <img src={gif} alt="Descripción del GIF" className="main-gif" />
      <div className="home-container">
        <h2 className="main-title">Neurotech UCB</h2>
        <p className="main-description">
          NeurotechUCB is the neurotechnology student initiative from UCB. Our
          goal is to work on issues related to neuroscience with a technological
          and data-oriented approach. We aim to develop innovative solutions,
          and train others with the same goal. We are located in La Paz,
          Bolivia.
        </p>

        <section className="info-section">
          <div className="info-card">
            <h3 className="info-title">Mission</h3>
            <p className="info-text">
              As a community, we are committed to the personal and professional
              growth of our members, as well as to the development of innovative
              solutions that contribute to the well-being of our society.
            </p>
            <ul className="info-list">
              <li>Organize academic events, workshops, and conferences.</li>
              <li>Provide networking opportunities among students.</li>
              <li>Promote research and multidisciplinary projects.</li>
              <li>Encourage participation in university life.</li>
            </ul>
            <p className="info-text">
              Our mission is to foster research, education, and the practical
              application of neurotechnology at La Paz, promoting a
              multidisciplinary approach that integrates knowledge and skills
              from diverse fields to address neuroscience challenges.
            </p>
          </div>

          <div className="info-card">
            <h3 className="info-title">Vision</h3>
            <p className="info-text">
              To be recognized as leaders in the promotion and application of
              neurotechnology in the Latin American community, driving
              significant advances that improve people's quality of life and
              promote sustainable development in our region.
            </p>
          </div>
        </section>

        <section className="sponsors-section">
          <h3 className="sponsors-title">Our Sponsors</h3>
          <div className="sponsors-logos">
            <a
              href="https://neurotechx.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={ntxLogo} alt="Neurotech" className="sponsor-logo" />
            </a>
            <a
              href="https://lpz.ucb.edu.bo/unidad-de-investigacion-experimental/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={UIE} alt="UIE" className="sponsor-logo" />
            </a>
            <a
              href="https://www.ucb.edu.bo/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={UCB}
                alt="Universidad Catolica Boliviana"
                className="sponsor-logo"
              />
            </a>
            <a
              href="https://www.imt.ucb.edu.bo/cidimec/author/4xqr1/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={cidimec} alt="Cidimec" className="sponsor-logo" />
            </a>
            <a
              href="https://backyardbrains.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={backyard}
                alt="BackyardBrains"
                className="sponsor-logo"
              />
            </a>
            <a
              href="https://www.tinyml.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={tinyml} alt="Tinyml" className="sponsor-logo" />
            </a>
            <a
              href="https://openbci.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={openbci} alt="OpenBCI" className="sponsor-logo" />
            </a>
          </div>
        </section>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d804.1208444642009!2d-68.11214902361621!3d-16.522819947208983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f20ee187a3103%3A0x2f2bb2b7df32a24d!2sUniversidad%20Cat%C3%B3lica%20Boliviana%20%22San%20Pablo%22!5e0!3m2!1ses!2sus!4v1729721207070!5m2!1ses!2sus"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Mapa de la Universidad Católica Boliviana"
        ></iframe>
      </div>
      <Footer className="footer" />

      {showButton && (
        <button className="scroll-top-btn" onClick={scrollToTop}>
          ↑
        </button>
      )}
    </div>
  );
};
