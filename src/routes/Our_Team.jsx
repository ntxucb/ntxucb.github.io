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
        "El equipo de Hardware se encarga de diseñar y optimizar los dispositivos.",
      link: "./src/routes/DataScience.jsx",
    },
    {
      name: "Data Science",
      color: "#00bb5a",
      description:
        "El equipo de Data Science trabaja con grandes volúmenes de datos para encontrar patrones.",
      link: "./src/routes/DataScience.jsx",
    },
    {
      name: "Outreach",
      color: "#e8dd10",
      description:
        "El equipo de Outreach busca establecer relaciones y alianzas externas.",
      link: "./src/routes/DataScience.jsx",
    },
    {
      name: "Social Media",
      color: "#f88c07",
      description:
        "El equipo de Social Media maneja las redes sociales y la comunicación digital.",
      link: "./src/routes/DataScience.jsx",
    },
    {
      name: "Education",
      color: "#7900ca",
      description:
        "El equipo de Education se dedica a la capacitación y formación continua.",
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
