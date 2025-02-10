import React from "react";
import { TaskBar } from "../../components/layout/TaskBar/TaskBar";
import Footer from "../../components/layout/Footer/Footer";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./Podcast.css";
import { podcastData } from "../../assets/data/podcasts"; 

const PodcastGrid = () => {
  return (
    <Row xs={1} md={2} className="g-4">
      {podcastData.map((podcast, idx) => (
        <Col key={idx}>
          <Card className="podcast-card">
            <Card.Img
              variant="top"
              src={podcast.imgSrc}
              alt={podcast.title}
              className="podcast-image"
            />
            <Card.Body>
              <Card.Title className="podcast-title">{podcast.title}</Card.Title>
              <Card.Text className="podcast-description">
                {podcast.description}
              </Card.Text>
              <div className="podcast-buttons">
                {podcast.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={link.img}
                      alt="Podcast Link"
                      className="podcast-button-image"
                    />
                  </a>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export const Podcast = () => {
  return (
    <>
      <TaskBar />
      <div className="podcasts-container">
        <h1 className="podcasts-heading">Suggested Podcasts</h1>
        <h2>
          ¿Te interesa saber un poco más o quieres tener más información sobre
          Neurociencia, Neurotecnología e Investigación? Te dejamos los
          siguientes podcasts que te pueden interesar para complementar tus
          conocimientos y te pueden dar algunos datos interesantes sobre la
          neurociencia.
        </h2>
        <PodcastGrid />
      </div>
      <Footer />
    </>
  );
};

export default Podcast;