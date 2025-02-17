import React from "react";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="landing-page">
      {/* Header con Navbar */}

      <div className="scroll-view">
        <header className="header">
          <nav className="navbar">
            <div className="logo">
              <img src="Logo.png" alt="Neurotech UCB Logo" />
            </div>
            <ul className="nav-links">
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#mission">Mission</a>
              </li>
              <li>
                <a href="#vision">Vision</a>
              </li>
              <li>
                <a href="#events">Events</a>
              </li>
              <li>
                <a href="#podcast">Podcast</a>
              </li>
              <li>
                <a href="#our-team">Our Team</a>
              </li>
            </ul>
          </nav>
        </header>

        {/* Sección Home – utiliza el background y logo definidos en el CSS */}
        <div className="main-content" id="home">
          {/* La imagen de fondo se define en CSS mediante background-image */}
          <div className="neuron-illustration">
            <img src="Logo.png" alt="Logo" />
            <h1 className="title">
              NEUROTECH
              <br /> UCB
            </h1>
          </div>

          <div className="scroll-indicator">
            <img src="Arrow.png" height={40} />
          </div>
        </div>

        {/* Secciones adicionales */}
        <div id="about" className="section">
          <div className="container">
            <h2>About Neurotech UCB</h2>
            <p>
              NeurotechUCB is the neurotechnology student initiative from UCB.
              Our goal is to work on issues related to neuroscience with a
              technological and data-oriented approach. We aim to develop
              innovative solutions, and train others with the same goal. We are
              located in La Paz, Bolivia.
            </p>
          </div>
        </div>

        <div id="mission" className="section">
          <div className="container">
            <h2>Mission</h2>
            <p>
              As a community, we are committed to the personal and professional
              growth of our members, as well as to the development of innovative
              solutions that contribute to the well-being of our society.
            </p>
            <ul>
              <li>Organize academic events, workshops, and conferences.</li>
              <li>Provide networking opportunities among students.</li>
              <li>Promote research and multidisciplinary projects.</li>
              <li>Encourage participation in university life.</li>
            </ul>
            <p>
              Our mission is to foster research, education, and the practical
              application of neurotechnology at La Paz, promoting a
              multidisciplinary approach that integrates knowledge and skills
              from diverse fields to address neuroscience challenges.
            </p>
          </div>
        </div>

        <div id="vision" className="section">
          <div className="container">
            <h2>Vision</h2>
            <p>
              To be recognized as leaders in the promotion and application of
              neurotechnology in the Latin American community, driving
              significant advances that improve peoples quality of life and
              promote sustainable development in our region.
            </p>
          </div>
        </div>

        <div id="events" className="section">
          <div className="container">
            <h2>Events</h2>
            <p>
              Details about upcoming academic events, workshops, and
              conferences.
            </p>
          </div>
        </div>

        <div id="podcast" className="section">
          <div className="container">
            <h2>Podcast</h2>
            <p>Listen to our latest podcast episodes and insights.</p>
          </div>
        </div>

        <div id="our-team" className="section">
          <div className="container">
            <h2>Our Team</h2>
            <p>
              Meet our dedicated team members driving Neurotech UCB forward.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
