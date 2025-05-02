/* eslint-disable no-unused-vars*/
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Events.css";
import CardEvent from "../../components/common/CardEvent/CardEvent";
import CardMainEvent from "../../components/common/CardMainEvent/CardMainEvent";

export const Events = () => {
  const navigate = useNavigate();

  const image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxFvoRX4Y_mAxPaWqaHP5XBrWmjd47UfiM0A&s";
  const title = "Titulo del Evento";
  const description = "loremIpsum datos del evento";
  const buttonText = "Registrarse Ahora";
  const onButtonClick = "Click";

  const handleEventClick = (eventId) => {
    navigate(`/ntxucblapaz.github.io/events/${eventId}`)
  }

  return (
    <>
      <div className="container">

        <h2 className="title-section">Evento Destacado</h2>
        <div>
          <CardMainEvent
            title={title}
            image={image}
            description={description}
            buttonText={buttonText}
            onButtonClick={() => handleEventClick(1)} />
        </div>
        <h2 className="title-section">Proximos Eventos</h2>
        <div className="row">
          <CardEvent
            title={title}
            image={image}
            description={description}
            buttonText="Registrarse"
            onButtonClick={onButtonClick}
          />
          <CardEvent
            title={title}
            image={image}
            description={description}
            buttonText="Registrarse"
            onButtonClick={onButtonClick}
          />
          <CardEvent
            title={title}
            image={image}
            description={description}
            buttonText="Registrarse"
            onButtonClick={onButtonClick}
          />
        </div>

        <h2 className="title-section">Eventos pasados</h2>
        <div className="row">
          <CardEvent
            title={title}
            image={image}
            description={description}
            buttonText="Registrarse"
            onButtonClick={onButtonClick}
          />
          <CardEvent
            title={title}
            image={image}
            description={description}
            buttonText="Registrarse"
            onButtonClick={onButtonClick}
          />
          <CardEvent
            title={title}
            image={image}
            description={description}
            buttonText="Registrarse"
            onButtonClick={onButtonClick}
          />
        </div>

        <h2 className="title-section">Colaboradores</h2>
        <div className="row">
          <div className="colaborador">
            <img src="src/assets/images/placeholder-cuadrado.jpg" alt="" />
          </div>
          <div className="colaborador">
            <img src="src/assets/images/placeholder-cuadrado.jpg" alt="" />
          </div>
          <div className="colaborador">
            <img src="src/assets/images/placeholder-cuadrado.jpg" alt="" />
          </div>
        </div>


      </div>

    </>
  );
};
