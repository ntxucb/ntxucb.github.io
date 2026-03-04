import React, { useState } from "react";
import "./Our_Team.css";
import teams from "../../assets/data/teams.json";

export const Our_Team = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="ourteam-page">
      <h1 className="ourteam-title">Our Teams</h1>

      <div className="accordion-stage" role="tablist" aria-label="Teams">
        {teams.map((team, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={team.name}
              className={`team-pane ${isActive ? "active" : ""}`}
              style={{ backgroundColor: team.color }}
              onClick={() => setActiveIndex(index)}
              role="tab"
              aria-selected={isActive}
              aria-controls={`pane-${index}`}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setActiveIndex(index);
              }}
            >
              {/* Etiqueta vertical (siempre visible) */}
              <div className="pane-label">
                <span className="pane-label-text">{team.name.toUpperCase()}</span>
              </div>

              {/* Contenido (solo visible cuando está activo) */}
              <div
                id={`pane-${index}`}
                className="pane-content"
                aria-hidden={!isActive}
              >
                <button
                  type="button"
                  className="pane-close"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIndex(0); // o el que prefieras
                  }}
                  aria-label="Close"
                >
                  ✕
                </button>

                <h2 className="pane-title">{team.name}</h2>
                <p className="pane-desc">{team.description}</p>

                <div className="pane-columns">
                  <div className="pane-col">
                    <h3 className="pane-subtitle">Leadership</h3>
                    <div className="people-grid">
                      {(team.leaders || []).length === 0 ? (
                        <div className="empty-hint">No leaders yet.</div>
                      ) : (
                        team.leaders.map((p, i) => (
                          <PersonCard key={`${p.name}-${i}`} person={p} variant="leader" />
                        ))
                      )}
                    </div>
                  </div>

                  <div className="pane-col">
                    <h3 className="pane-subtitle">Members</h3>
                    <div className="people-grid">
                      {(team.members || []).length === 0 ? (
                        <div className="empty-hint">No members yet.</div>
                      ) : (
                        team.members.map((p, i) => (
                          <PersonCard key={`${p.name}-${i}`} person={p} variant="member" />
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

function PersonCard({ person, variant = "member" }) {
  return (
    <div className={`person-card ${variant}`} onClick={(e) => e.stopPropagation()}>
      <div className="avatar">
        {person.image ? (
          <img src={person.image} alt={person.name} />
        ) : (
          <div className="avatar-placeholder" />
        )}
      </div>
      <div className="person-meta">
        <div className="person-name">{person.name}</div>
        <div className="person-role">{person.role}</div>
      </div>
    </div>
  );
}