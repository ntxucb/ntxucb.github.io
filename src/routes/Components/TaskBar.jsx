import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import NTX_Logo from "./Logos/NTXUCBLAT.png";
import "./TaskBar.css";

export function TaskBar() {
  return (
    <Navbar style={{ backgroundColor: "black" }}>
      <Container>
        <Navbar.Brand as={Link} to="/ntxucblapaz.github.io/home">
          <img
            src={NTX_Logo}
            width="120"
            className="d-inline-block align-top"
            alt="Neurotech La Paz"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/ntxucblapaz.github.io/home"
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
