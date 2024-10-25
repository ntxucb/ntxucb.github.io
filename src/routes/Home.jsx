import React from "react";
import { TaskBar } from "./Components/TaskBar";
import Footer from "./Components/Footer";
import gif from "./Components/Logos/NTXUCB_Logo_first_github.gif";
import ntxLogo from "./Components/Logos/NTX_Logo.png";
import UIE from "./Components/Logos/UIELogo.png";
import UCB from "./Components/Logos/UCB.png";
import "./Home.css";

export const Home = () => {
  return (
    <div className="home-container">
      <TaskBar />
      <div className="content">
        <img src={gif} alt="Descripción del GIF" className="gif" />
        <h2 className="title">Neurotech UCB</h2>
        <p className="description">
          NeurotechUCB is the neurotechnology student initiative from UCB. Our
          goal is to work on issues related to neuroscience with a technological
          and data-oriented approach. We aim to develop innovative solutions,
          and train others with the same goal. We are located in La Paz,
          Bolivia.
        </p>

        <div className="split-screen">
          <div className="column">
            <h3 className="subtitle">Mission</h3>
            <p className="text">
              As a community, we are committed to the personal and professional
              growth of our members, as well as to the development of innovative
              solutions that contribute to the well-being of our society.
            </p>
            <ul className="text">
              <li>Organize academic events, workshops, and conferences.</li>
              <li>
                Provide opportunities for networking and collaboration among
                students.
              </li>
              <li>
                Promote research and the development of multidisciplinary
                projects.
              </li>
              <li>Encourage student participation in university life.</li>
            </ul>
            <p className="text">
              Our mission is to foster research, education, and the practical
              application of neurotechnology at La Paz, promoting a
              multidisciplinary approach that integrates knowledge and skills
              from diverse fields to address neuroscience challenges in
              innovative and effective ways. We work to foster a culture of
              neuroscience and neurotechnology research and development in La
              Paz by providing resources, opportunities, and support to those
              interested in exploring and applying innovative solutions in this
              field.
            </p>
          </div>

          <div className="column">
            <h3 className="subtitle">Vision</h3>
            <p className="text">
              To be recognized as leaders in the promotion and application of
              neurotechnology in the Latin American community, driving
              significant advances that improve people's quality of life and
              promote sustainable development in our region. To become a center
              of reference for neurotechnology research and development in Latin
              America, attracting talent and resources from across the continent
              to drive the creation of innovative solutions with global impact
              from our city.
            </p>
          </div>
        </div>

        <div className="sponsors-section">
          <h3 className="subtitle">Our Sponsors</h3>
          <div className="sponsors-container">
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
          </div>
        </div>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d804.1208444642009!2d-68.11214902361621!3d-16.522819947208983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f20ee187a3103%3A0x2f2bb2b7df32a24d!2sUniversidad%20Cat%C3%B3lica%20Boliviana%20%22San%20Pablo%22!5e0!3m2!1ses!2sus!4v1729721207070!5m2!1ses!2sus"
          width="1515"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Mapa de la Universidad Católica Boliviana"
        ></iframe>
      </div>
      <Footer />
    </div>
  );
};
