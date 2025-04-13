import React from "react";
import { useNavigate } from "react-router-dom";
import "./Events.css";
import CardEvent from "../../components/common/CardEvent/CardEvent";
import CardMainEvent from "../../components/common/CardMainEvent/CardMainEvent";
import { eventsData } from "../../assets/data/events";
import squared_placeholder from "../../assets/images/placeholder-cuadrado.jpg";

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
          {[1, 2, 3].map((_, index) => (
            <div className="colaborador" key={index}>
              <img src={squared_placeholder} alt={`Colaborador ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};