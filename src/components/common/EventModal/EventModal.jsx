import React from "react";
import "./EventModal.css";
import placeholderImage from "../../../assets/images/wide_placeholder.webp";

const EventModal = ({ isOpen, onClose, onClick, title, image, date, description, highlighted, continueDescription }) => {
  if (!isOpen) return null;

  return (
    <div className="event-modal-overlay">
      <div className="event-modal-content">
        <button className="event-modal-close" onClick={onClose}>✕</button>
        <div className="event-modal-image">
          <img src={image} alt="Evento" />
        </div>
        <div className="event-modal-text">
          <h2 className="event-modal-title">{title}</h2>
          <p className="event-modal-date">📅 <strong>{date}</strong></p>
          <p className="event-modal-description">
            {description} <span className="highlight">{highlighted}</span> {continueDescription}
          </p>
          <button className="event-modal-button" onClick={onClick}>
            Más Información
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;