import React from "react";
// import { TaskBar } from "../../components/layout/TaskBar/TaskBar";
// import Footer from "../../components/layout/Footer/Footer";
// import CardEvent from "../Events/CardEvent";
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
      <div className="container">

        <h1 className="title-section">Evento Destacado</h1>
        <div>
          <CardMainEvent 
          title={title} 
          image={image} 
          description={description} 
          buttonText={buttonText} 
          onButtonClick={onButtonClick}/>
        

        </div>
        <h1 className="title-section">Proximos Eventos</h1>

      </div>

    </>
  );
};
