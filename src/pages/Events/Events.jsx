/* eslint-disable no-unused-vars*/
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Events.css";
import CardEvent from "../../components/common/CardEvent/CardEvent";
import CardMainEvent from "../../components/common/CardMainEvent/CardMainEvent";

export const Events = () => {
  const navigate = useNavigate();

  const image = "https://miro.medium.com/v2/resize:fit:1400/0*Szd0W7NuJ9ls0XBh.jpg";
  const title = "Titulo del Evento";
  const description = "loremIpsum datos del evento";
  const buttonText = "Registrarse Ahora";
  const onButtonClick = "Click";
  const location = "La Paz, B.C.S.";
  const date = "12 de diciembre 2023";

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
            onButtonClick={() => handleEventClick(1)} 
            location ="La Paz, B.C.S."
            date="12 de diciembre 2023"
            />
        </div>
        <h2 className="title-section">Proximos Eventos</h2>
        <div className="container">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            <div className="col">
              <CardEvent
                title={title}
                image={image}
                description={description}
                buttonText="Registrarse"
                onButtonClick={onButtonClick}
                location={location}
                date={date}
              />
            </div>
            <div className="col">
              <CardEvent
                title={title}
                image={image}
                description={description}
                buttonText="Registrarse"
                onButtonClick={onButtonClick}
                location={location}
                date={date}
              />
            </div>
            <div className="col">
              <CardEvent
                title={title}
                image={image}
                description={description}
                buttonText="Registrarse"
                onButtonClick={onButtonClick}
                location={location}
                date={date}
              />
            </div>
            <div className="col">
              <CardEvent
                title={title}
                image={image}
                description={description}
                buttonText="Registrarse"
                onButtonClick={onButtonClick}
                location={location}
                date={date}
              />
            </div>
            <div className="col">
              <CardEvent
                title={title}
                image={image}
                description={description}
                buttonText="Registrarse"
                onButtonClick={onButtonClick}
                location={location}
                date={date}
              />
            </div>
            {/* Agrega más cards según necesites */}
          </div>
        </div>

        <h2 className="title-section">Eventos pasados</h2>
        <div className="container">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            <div className="col">
              <CardEvent
                title={title}
                image={image}
                description={description}
                buttonText="Registrarse"
                onButtonClick={onButtonClick}
                location={location}
                date={date}
              />
            </div>
            <div className="col">
              <CardEvent
                title={title}
                image={image}
                description={description}
                buttonText="Registrarse"
                onButtonClick={onButtonClick}
                location={location}
                date={date}
              />
            </div>
            <div className="col">
              <CardEvent
                title={title}
                image={image}
                description={description}
                buttonText="Registrarse"
                onButtonClick={onButtonClick}
                location={location}
                date={date}
              />
            </div>
            {/* Agrega más cards según necesites */}
          </div>
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
