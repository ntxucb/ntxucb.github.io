import React from "react";
import { TaskBar } from "../../components/layout/TaskBar/TaskBar";
import Footer from "../../components/layout/Footer/Footer";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./Projects.css";
import { projectData } from "../../assets/data/projects"; // Importamos los datos

const GridExample = () => {
  return (
    <Row xs={1} md={2} className="g-4">
      {projectData.map((project, idx) => (
        <Col key={idx}>
          <Card>
            <Card.Img
              variant="top"
              src={project.imgSrc}
              alt={project.title}
              className="img-fluid"
            />
            <Card.Body>
              <Card.Title className="project-title">{project.title}</Card.Title>
              <Card.Text className="project-text">{project.text}</Card.Text>
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