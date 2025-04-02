import React from "react";
import { useParams } from "react-router-dom";
import "./EventDetails.css"
import placeholderImage from "../..//assets/images/wide_placeholder.webp";


function EventDetails() {
  const { id } = useParams();

  return (
    <>
     <div className="section--row" id="main-info">
        <div className="section__content main__content">
            <h1 className="section__content-title">
                HACKATHON NTX LA PAZ 2024
            </h1>
            <p className="section__content-date">
                15 mar, 2:00 - 9:00p.m. (GMT+1)
            </p>
            <p className="section__content-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, quidem blanditiis. Asperiores, officiis aperiam. Quas autem unde voluptatum quod rem officiis vitae, commodi dolores praesentium ratione saepe recusandae dignissimos voluptatibus.
            </p>
            <div className="section__content-qta">
                <a href="">
                    Registrarse
                </a>
            </div>
        </div>
        <div className="section__image">
            <img src={placeholderImage} alt="Imagen principal del proyecto" />
        </div>

     </div>
     <div className="section--column" id="left-time">
        <div className="section__time">
            <div className="section__time-element">
                <p className="section__time-text">
                    21
                </p>
                <p className="section__time-text">
                    Dias
                </p>
            </div>
            <div className="section__time-element">
                <p className="section__time-text">
                    15
                </p>
                <p className="section__time-text">
                    Horas
                </p>
            </div>
            <div className="section__time-element">
                <p className="section__time-text">
                    25
                </p>
                <p className="section__time-text">
                    Minutos
                </p>
            </div>
        </div>
        <div className="section__content--dark">
            <h2 className="section__content-title--secondary">Acerca de este evento</h2>
            <p className="section__content-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem non odio, minima magni perferendis vitae sapiente optio eveniet, cumque aut architecto neque, nesciunt ut ipsam quia illum minus culpa? Corrupti!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam dignissimos, ratione suscipit hic veniam earum perspiciatis vel blanditiis libero, explicabo doloribus quis asperiores iste cumque. Vitae officia saepe corporis eveniet.
            </p>
        </div>
     </div>
    </>
  );
}

export default EventDetails;