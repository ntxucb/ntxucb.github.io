import React from "react";
import { TaskBar } from "../../components/layout/TaskBar/TaskBar";
import Footer from "../../components/layout/Footer/Footer";
import { Link } from "react-router-dom";
import "./Our_Team.css"; 
import teams from "../../assets/data/teams.json"; // Importamos el JSON

export const Our_Team = () => {
  return (
    <>
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
    </>
  );
};