// import React from "react";
// import { TaskBar } from "../../components/layout/TaskBar/TaskBar";
// import Footer from "../../components/layout/Footer/Footer";
import CardEvent from "../Events/CardEvent";
import "./Events.css";
import CardMainEvent from "./CardMainEvent";

export const Events = () => {
  const image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxFvoRX4Y_mAxPaWqaHP5XBrWmjd47UfiM0A&s";
  const title = "Titulo del Evento";
  const description = "loremIpsum datos del evento";
  const buttonText = "Registrarse Ahora";
  const onButtonClick = "Click";
  return (
    <>
      {/* Seccion del evento Principal */}
      <section>
        <div className="container">
          <h1 className="title-section">Evento Destacado</h1>
          <div>
            <CardMainEvent
              title={title}
              image={image}
              description={description}
              buttonText={buttonText}
              onButtonClick={onButtonClick} />
          </div>
        </div>
      </section>

      {/* Seccion de los Proximos Eventos */}
      <section className="proximos-eventos-section">
        <div className="own-container">
          <h1 className="title-section">Proximos Eventos</h1>
          <div className="proximos-eventos-container">
            
            <div className="even-item">
              <CardEvent
                title={title}
                image={image}
                description={description}
                buttonText="Registrarse1"
                onButtonClick={onButtonClick}
              ></CardEvent>
            </div>
            <div className="even-item">
              <CardEvent
                title={title}
                image={image}
                description={description}
                buttonText="Registrarse2"
                onButtonClick={onButtonClick}
              ></CardEvent>
            </div>
            <div className="even-item">
              <CardEvent
                title={title}
                image={image}
                description={description}
                buttonText="Registrars3e"
                onButtonClick={onButtonClick}
              ></CardEvent>
            </div>

            <div className="even-item">
              <CardEvent
                title={title}
                image={image}
                description={description}
                buttonText="Registrars3e"
                onButtonClick={onButtonClick}
              ></CardEvent>
            </div>



          </div>
        </div>
      </section>
      
      <section>
        <div>
          <h1>Eventos pasados</h1>
        </div>
        <div></div>
      </section>

    </>
  );
};
