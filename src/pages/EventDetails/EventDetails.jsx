import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EventDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { eventsData } from "../../assets/data/events";

function EventDetails() {
    const { id } = useParams();
    const event = eventsData.find((e) => e.id.toString() === id);

    const navigate = useNavigate();

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

    useEffect(() => {
        if (!event?.details?.extraContent) return;
    
        const content = event.details.extraContent;
    
        if (typeof content === "string" && content.includes("instagram.com")) {
            const scriptAlreadyLoaded = document.querySelector(
                'script[src="https://www.instagram.com/embed.js"]'
            );
    
            if (!scriptAlreadyLoaded) {
                const script = document.createElement("script");
                script.src = "https://www.instagram.com/embed.js";
                script.async = true;
                script.onload = () => {
                    window?.instgrm?.Embeds?.process?.();
                };
                document.body.appendChild(script);
            } else {
                setTimeout(() => {
                    window?.instgrm?.Embeds?.process?.();
                }, 0);
            }
        }
    }, [event]);


    if (!event) return <div>Event not found</div>;

    const {
        completeTitle,
        startDate,
        endDate,
        description,
        about,
        location,
        locationMap,
        when,
        image,
        registrationLink,
        moreInfoLink,
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
                    {registrationLink && (
                        <div className="section__content-qta">
                            <button
                                className="button"
                                onClick={() => window.open(registrationLink, "_blank")}
                            >
                                Register
                            </button>
                        </div>
                    )}
                </div>
                <div className="section__image">
                    <img src={image} alt="Main event image" />
                </div>
            </div>

            <div className="section--column" id="left-time">
                <div className="section__time">
                    {eventStarted ? (
                        <p className="section__time-started">The event has started!</p>
                    ) : (
                        <>
                            <div className="section__time-element">
                                <p className="section__time-text">{timeLeft.days ?? "--"}</p>
                                <p className="section__time-text">Days</p>
                            </div>
                            <div className="section__time-element">
                                <p className="section__time-text">{timeLeft.hours ?? "--"}</p>
                                <p className="section__time-text">Hours</p>
                            </div>
                            <div className="section__time-element">
                                <p className="section__time-text">{timeLeft.minutes ?? "--"}</p>
                                <p className="section__time-text">Minutes</p>
                            </div>
                        </>
                    )}
                </div>

                <div className="section__content--dark">
                    <h2 className="section__content-title--secondary">About this event</h2>
                    <p className="section__content-description">{about}</p>
                    {moreInfoLink && (
                        <div className="section__content-qta" id="about_button">
                            <button
                                className="button"
                                onClick={() => window.open(moreInfoLink, "_blank")}
                            >
                                Learn more
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="section--row" id="place">
                <div className="info-event">
                    <div className="info-event__content">
                        <p className="info-event__title">When</p>
                        {splitLines(when)}
                    </div>
                    <FontAwesomeIcon icon={faClock} className="info-event__icon" />
                </div>

                <div className="info-event">
                    <div className="info-event__content">
                        <p className="info-event__title">Where</p>
                        {splitLines(location)}
                    </div>
                    <FontAwesomeIcon icon={faLocationDot} className="info-event__icon" />
                </div>

                {locationMap && (
                    <div className="section__map">
                        <iframe src={locationMap} loading="lazy" title="event map"></iframe>
                    </div>
                )}

            </div>

            {event.details.extraContent && (
                <div className="section--row">
                    <div className="section__content">
                        <h2 className="section__content-title">
                           Extra Content 
                        </h2>
                        <div id="extra_content" dangerouslySetInnerHTML={{ __html: event.details.extraContent }}/>
                    </div>
                </div>
            )}

            <div className="section--row">
                <div className="section__content-qta" id="back_button">
                    <a href="/events">Back to events</a>
                </div>
            </div>

        </>
    );
}

export default EventDetails;