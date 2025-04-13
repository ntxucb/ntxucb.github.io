import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import NTX_Logo from "../../../assets/logos/neurotechXLatamWhite.png";
import NTXUCB_Logo from "../../../assets/logos/NeuroTechUCB.png"
import "./TaskBar.css";

export function TaskBar() {
  return (
    <Navbar expand="lg" id="navbar" >
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/ntxucblapaz.github.io/">
          <img
            src={NTX_Logo}
            className="d-inline-block align-top navbar__img"
            alt="Neurotech La Paz"
          />
          <img
            src={NTXUCB_Logo}
            className="d-inline-block align-top navbar__img"
            alt="Neurotech La Paz"
          />
        </Navbar.Brand>

        {/* Botón Hamburguesa */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        {/* Enlaces */}
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/ntxucblapaz.github.io/"
              className="nav-link"
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/ntxucblapaz.github.io/projects"
              className="nav-link"
            >
              Projects
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/ntxucblapaz.github.io/events"
              className="nav-link"
            >
              Events
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/ntxucblapaz.github.io/podcast"
              className="nav-link"
            >
              Podcast
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/ntxucblapaz.github.io/our_team"
              className="nav-link"
            >
              Our Team
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
