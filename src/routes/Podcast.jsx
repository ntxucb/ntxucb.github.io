import React from "react";
import { TaskBar } from "./Components/TaskBar";
import Footer from "./Components/Footer";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./Podcast.css";
import SpotifyIcon from "./Components/Icons/Spotify.png";
import YoutubePodcastIcon from "./Components/Icons/Youtube.png";
import Img1 from "./Components/Icons/Podcast1.png";
import Img2 from "./Components/Icons/Podcast2.png";

const PodcastGrid = () => {
  const podcastData = [
    {
      title: "Podcast 1: EL OTRO LADO DEL CEREBRO",
      description:
        "​Es un podcast que cuenta con la participación de distintos especialistas en psicología y neurociencia, cuyo objetivo es explorar las profundidades de la mente humana. Producido por: Neurotransmitiendo",
      imgSrc: Img1,
      links: [
        {
          img: SpotifyIcon,
          url: "https://open.spotify.com/show/5vrxvfOgGfl7B9QDYn5tJw?si=Vj6bfcfjT0CcDkhjlTjW0Q&nd=1&dlsi=09b4a828763a4936",
        },
      ],
    },
    {
      title: "Podcast 2: MI ÚLTIMA NEURONA",
      description:
        "Es un podcast cuyo objetivo es otorgar información sobre neurociencia  de forma gratuita, al mismo tiempo busca inspirar a una nueva generación de científicos hispanos. Productora: Jessica Chomik-Morales",
      imgSrc: Img2,
      links: [
        {
          img: SpotifyIcon,
          url: "https://open.spotify.com/show/4tif9z6zO0vtGM94sjQNqg?si=bnIJoIrZRo2sOoA1Y9f2Zg&nd=1&dlsi=a6ad16904f3947bd",
        },
        {
          img: YoutubePodcastIcon,
          url: "https://youtube.com/@miultimaneurona?si=gwCbL3qQhYur4sQj",
        },
      ],
    },
  ];

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
          siguientes podcats que te pueden interesar para complementar tus
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
