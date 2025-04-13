import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./EventDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import portraitPlaceholder from "../../assets/images/Portrait_Placeholder.png";
import { eventsData } from "../../assets/data/events";

function EventDetails() {
    const { id } = useParams();
    const event = eventsData.find((e) => e.id.toString() === id);

    const [timeLeft, setTimeLeft] = useState({});
    const [eventStarted, setEventStarted] = useState(false);

    useEffect(() => {
        if (!event) return;

        const targetDate = new Date(event.details.formatedStartDate).getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance <= 0) {
                setEventStarted(true);
                setTimeLeft({});
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

            setTimeLeft({ days, hours, minutes });
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 60000);

        return () => clearInterval(interval);
    }, [event]);

    if (!event) {
        return <div>Evento no encontrado</div>;
    }

    const {
        completeTitle,
        startDate,
        endDate,
        description,
        about,
        location,
        locationMap,
        when,
        organizers,
        image,
    } = event.details;

    const splitLines = (text) =>
        text.split("--").map((line, idx) => (
            <p key={idx} className="info-event__text">
                {line.trim()}
            </p>
        ));

    return (
        <>
            <div className="section--row" id="main-info">
                <div className="section__content main__content">
                    <h1 className="section__content-title">{completeTitle}</h1>
                    <p className="section__content-date">{startDate} - {endDate}</p>
                    <p className="section__content-description">{description}</p>
                    <div className="section__content-qta">
                        <a href="#">Registrarse</a>
                    </div>
                </div>
                <div className="section__image">
                    <img src={image} alt="Imagen principal del evento" />
                </div>
            </div>

            <div className="section--column" id="left-time">
                <div className="section__time">
                    {eventStarted ? (
                        <p className="section__time-started">¡El evento ha comenzado!</p>
                    ) : (
                        <>
                            <div className="section__time-element">
                                <p className="section__time-text">{timeLeft.days ?? "--"}</p>
                                <p className="section__time-text">Días</p>
                            </div>
                            <div className="section__time-element">
                                <p className="section__time-text">{timeLeft.hours ?? "--"}</p>
                                <p className="section__time-text">Horas</p>
                            </div>
                            <div className="section__time-element">
                                <p className="section__time-text">{timeLeft.minutes ?? "--"}</p>
                                <p className="section__time-text">Minutos</p>
                            </div>
                        </>
                    )}
                </div>

                <div className="section__content--dark">
                    <h2 className="section__content-title--secondary">Acerca de este evento</h2>
                    <p className="section__content-description">{about}</p>
                </div>
            </div>

            <div className="section--row" id="place">
                <div className="info-event">
                    <div className="info-event__content">
                        <p className="info-event__title">Cuándo</p>
                        {splitLines(when)}
                    </div>
                    <FontAwesomeIcon icon={faClock} className="info-event__icon" />
                </div>

                <div className="info-event">
                    <div className="info-event__content">
                        <p className="info-event__title">Dónde</p>
                        {splitLines(location)}
                    </div>
                    <FontAwesomeIcon icon={faLocationDot} className="info-event__icon" />
                </div>

                {locationMap && (
                    <div className="section__map">
                        <iframe src={locationMap} loading="lazy" title="mapa del evento"></iframe>
                    </div>
                )}
            </div>

            <div className="section--column" id="organizers">
                <h2 className="section__content-title--secondary">Organizadores</h2>
                <div className="section--row cards-container">
                    {organizers.map((org, index) => (
                        <div className="profile" key={index}>
                            <div className="profile__picture">
                                <img src={org.image || portraitPlaceholder} alt={`Organizador: ${org.name}`} />
                            </div>
                            <p className="profile__name">{org.name}</p>
                            <p className="profile__role">{org.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default EventDetails;