import React from "react";
import { TaskBar } from "./Components/TaskBar";
import Footer from "./Components/Footer";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Project1 from "./Components/ProjectImg/Project1.png";
import Project2 from "./Components/ProjectImg/Neurotec1.jpg";
import "./Projects.css";

const GridExample = () => {
  const cardData = [
    {
      title:
        "Project: Deep Learning for Affective State Recognition during Gameplay on the GAMEEMO Dataset",
      text: "This project helps us to monitor the different emotions that people experience during a video game and thus analyse whether the game is stressful, scary, satisfying, etc.",
      imgSrc: Project1,
    },
    {
      title:
        "Project: Alarm System and Vital Signs Indicator with Artificial Vision and Brain Signals.",
      text: "This project monitors vital signs and seeks to provide security to people by using different sensors; likewise, this project gave us recognition in the FUNTEC.",
      imgSrc: Project2,
    },
    // Puedes agregar más proyectos aquí si es necesario
  ];

  return (
    <Row xs={1} md={2} className="g-4">
      {" "}
      {/* Distribución de dos columnas por fila en pantallas medianas */}
      {cardData.map((card, idx) => (
        <Col key={idx}>
          <Card>
            <Card.Img
              variant="top"
              src={card.imgSrc}
              alt={card.title}
              className="img-fluid"
            />
            <Card.Body>
              <Card.Title className="project-title">{card.title}</Card.Title>
              <Card.Text className="project-text">{card.text}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export const Projects = () => {
  return (
    <>
      <TaskBar />

      <div className="container my-4">
        <h1 className="projects-heading">Projects</h1>
        <GridExample />
      </div>

      <Footer />
    </>
  );
};

export default Projects;
