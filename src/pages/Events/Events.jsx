import React from "react";
import { useNavigate } from "react-router-dom";
import "./Events.css";
import CardEvent from "../../components/common/CardEvent/CardEvent";
import CardMainEvent from "../../components/common/CardMainEvent/CardMainEvent";
import { eventsData } from "../../assets/data/events";
import squared_placeholder from "../../assets/images/placeholder-cuadrado.jpg";
import BrainAwarenessWeekLogo from "../../assets/logos/Brain-Awareness-Week-logo-color-rgb.png";
import DanaFoundationLogo from "../../assets/logos/Dana_Logo-1.png";
import IBROLogo from "../../assets/logos/IBRO_logo_main_RGB_1000.png";
import NeurotechUmsaLogo from "../../assets/logos/Logo actual.jpg";

export const Events = () => {
  const navigate = useNavigate();

  const handleEventClick = (eventId) => {
    navigate(`/ntxucblapaz.github.io/events/${eventId}`);
  };

  const outstandingEvent = eventsData.find((event) => event.isOutstanding);
  const upcomingEvents = eventsData.filter((event) => !event.isOutstanding);

  return (
    <>
      <div className="container">
        {outstandingEvent && (
          <>
            <h2 className="title-section">Evento Destacado</h2>
            <CardMainEvent
              title={outstandingEvent.title}
              image={outstandingEvent.image}
              description={outstandingEvent.description}
              buttonText={outstandingEvent.buttonText}
              onButtonClick={() => handleEventClick(outstandingEvent.id)}
            />
          </>
        )}

        <h2 className="title-section">Próximos Eventos</h2>
        <div className="row">
          {upcomingEvents.map((event) => (
            <CardEvent
              key={event.id}
              title={event.title}
              image={event.image}
              description={event.description}
              buttonText={event.buttonText}
              onButtonClick={() => handleEventClick(event.id)}
            />
          ))}
        </div>

        <h2 className="title-section">Colaboradores</h2>
        <div className="row">
          <div className="colaborador">
            <img src={BrainAwarenessWeekLogo} alt="Brain Awareness Week Logo" />
          </div>
          <div className="colaborador">
            <img src={DanaFoundationLogo} alt="Dana Foundation Logo" />
          </div>
          <div className="colaborador">
            <img src={IBROLogo} alt="IBRO Logo" />
          </div>
          <div className="colaborador">
            <img src={NeurotechUmsaLogo} alt="Neurotech UMSA Logo" />
          </div>
        </div>
      </div>
    </>
  );
};