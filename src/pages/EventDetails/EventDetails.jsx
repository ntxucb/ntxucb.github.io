import React from "react";
import { useParams } from "react-router-dom";
import "./EventDetails.css"
import placeholderImage from "../..//assets/images/wide_placeholder.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faClock,
    faLocationDot,
} from "@fortawesome/free-solid-svg-icons";


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
            <div className="section--row" id="place">
                <div className="info-event">
                    <div className="info-event__content">
                        <p className="info-event__title">
                            Cuándo
                        </p>
                        <p className="info-event__text">
                            9-11 de agosto de 2024
                        </p>
                        <p className="info-event__text">
                            11:00 p.m. - 10.00 p.m. (GMT+2)
                        </p>
                    </div>

                    <FontAwesomeIcon icon={faClock} className="info-event__icon" />

                </div>
                <div className="info-event">
                    <div className="info-event__content">
                        <p className="info-event__title">
                            Dónde
                        </p>
                        <p className="info-event__text">
                            UCB La Paz
                        </p>
                        <p className="info-event__text">
                            Av. 14 de Septiembre Nº 4807 esquina, La Paz, Bolivia
                        </p>
                    </div>

                    <FontAwesomeIcon icon={faLocationDot} className="info-event__icon" />

                </div>
                <div className="section__map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1671.4825846391861!2d-68.11042608241759!3d-16.52208641711459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f20ee187a3103%3A0x2f2bb2b7df32a24d!2sUniversidad%20Cat%C3%B3lica%20Boliviana%20%22San%20Pablo%22!5e0!3m2!1ses-419!2sbo!4v1743635547336!5m2!1ses-419!2sbo" loading="lazy"></iframe>
                </div>
            </div>
        </>
    );
}

export default EventDetails;