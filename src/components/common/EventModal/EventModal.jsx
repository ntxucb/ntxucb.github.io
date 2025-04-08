import React from "react";
import "./EventModal.css";
import placeholderImage from "../../../assets/images/wide_placeholder.webp";

const EventModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="event-modal-overlay">
      <div className="event-modal-content">
        <button className="event-modal-close" onClick={onClose}>✕</button>
        <div className="event-modal-image">
          <img src={placeholderImage} alt="Evento" />
        </div>
        <div className="event-modal-text">
          <h2 className="event-modal-title">¡No te pierdas este evento!</h2>
          <p className="event-modal-date">📅 <strong>20 de abril</strong></p>
          <p className="event-modal-description">
            Prepárate para un día lleno de <span className="highlight">charlas, talleres y más sorpresas</span> en el auditorio principal.
          </p>
          <button className="event-modal-button" onClick={onClose}>
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;