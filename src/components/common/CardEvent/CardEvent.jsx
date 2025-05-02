import PropTypes from "prop-types";
import './CardEvent.css';

const CardEvent = ({ title, description, image, buttonText, onButtonClick, date, location }) => {
    return (
      <div className="card h-100 shadow border-0">
        {image && (
          <div className="overflow-hidden">
            <img 
              src={image} 
              className="card-img-top object-fit-cover" 
              alt={title}
              style={{ height: "300px" }}
            />
          </div>
        )}
        <div className="card-body d-flex flex-column">
            {/* Título */}
            <h5 className="card-title mb-1">{title}</h5>
            
            {/* Descripción */}
            <p className="card-text text-muted flex-grow-1 mb-1">{description}</p>
            
            {/* Metadatos - Ahora en bloques separados */}
            <div className="mb-2">
                {/* Ubicación con icono */}
                <div className="d-flex align-items-center mb-2">
                <i className="bi bi-geo-alt me-2 text-muted"></i>
                <small className="text-muted">{location}</small>
                </div>
                {/* Fecha como badge */}
                <div className="d-flex align-items-center mb-1">
                <i className="bi bi-calendar3 me-2 text-primary"></i>
                <span className="badge bg-primary bg-opacity-10 text-primary">
                    {date}
                </span>
                </div>
                
                
            </div>
            
            {/* Botón */}
            <button 
                className="btn w-100 mt-auto boton-estilos"
                onClick={onButtonClick}
            >
                <i className="bi bi-ticket-perforated me-2"></i>
                {buttonText}
            </button>
        </div>
      </div>
    );
  };

// ✅ Validación de los props con PropTypes
CardEvent.propTypes = {
    title: PropTypes.string.isRequired,         // title debe ser un string obligatorio
    description: PropTypes.string,              // description es un string opcional
    image: PropTypes.string,                    // image es un string opcional
    buttonText: PropTypes.string,               // buttonText es un string opcional
    onButtonClick: PropTypes.func               // onButtonClick es una función opcional
  };
  
export default CardEvent;