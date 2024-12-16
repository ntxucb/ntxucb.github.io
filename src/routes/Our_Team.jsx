import React from "react";
import { TaskBar } from "./Components/TaskBar";
import Footer from "./Components/Footer";
import { Link } from "react-router-dom";
import "./Our_Team.css"; // Para los estilos

export const Our_Team = () => {
  const teams = [
    {
      name: "Hardware",
      color: "#0a33a5",
      description:
        "El equipo de Hardware se encarga de diseñar y optimizar los dispositivos, por lo que buscamos personas interesadas en: Diseno y mantenimiento de equipos biomedicos. Habilidad con sistemas embebidos y sus aplicacionesen la robotica. Se valora un buen nivel de ingles y las habilidades de liderazgo.",
      link: "./src/routes/DataScience.jsx",
    },
    {
      name: "Data Science",
      color: "#00bb5a",
      description:
        "El equipo de Data Science trabaja con grandes volúmenes de datos para encontrar patrones es por esto que buscamos personas interesadas en: Machine Learning. Experiencia con manejo y analisis de datos. Procesamiento de senales. Se valora un buen nivel de ingles y habilidades de liderazgo.",
      link: "./src/routes/DataScience.jsx",
    },
    {
      name: "Outreach",
      color: "#e8dd10",
      description:
        "El equipo de Outreach busca establecer relaciones y alianzas externas, es por este motivo que el team busca: Capacidad de gestion y organizacion de eventos. Facilidad de comunicacion oreal y escrita. Habilidades interpersonales y de networking. Se valora un buen nivel de ingles y hailidades de liderazgo.",
      link: "./src/routes/DataScience.jsx",
    },
    {
      name: "Social Media",
      color: "#f88c07",
      description:
        "El equipo de Social Media maneja las redes sociales y la comunicación digital, por lo que en estos las principales caracteristicas que se buscan en los postulantes son: Edicion de videos. Diseno de contenido. Manejo de redes sociales. Se valora un buen nivel de ingles y las habilidades de liderazgo",
      link: "./src/routes/DataScience.jsx",
    },
    {
      name: "Education",
      color: "#7900ca",
      description:
        "El equipo de Education se dedica a la capacitación y formación continua, por lo que se busca personas para: Elaboracion de contenidos educativos. Manejo de herramientas digitales para edicion. Pasion por la ensenanza. Se valora un buen nivel de ingles y habilidades de liderazgo.",
      link: "./src/routes/DataScience.jsx",
    },
  ];

  return (
    <>
      <TaskBar />
      <h1>Our Team</h1>
      <div className="cards-container">
        {teams.map((team, index) => (
          <div
            key={index}
            className="team-card"
            style={{ backgroundColor: team.color }}
          >
            <h3>{team.name}</h3>
            <p>{team.description}</p>
            <Link to={team.link} className="card-link">
              Explore {team.name}
            </Link>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};
