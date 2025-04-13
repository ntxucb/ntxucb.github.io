import PropTypes from "prop-types";
import './CardEvent.css';

const CardEvent = ({ title, description, image, buttonText, onButtonClick }) => {
    return (
        <div className="card" style={{ width: "18rem" }}>
            {image && <img src={image} className="card-img-top" alt={title} />}
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text-secondary">{description}</p>
                {buttonText && (
                    <button className="btn btn-primary card-button" onClick={onButtonClick}>
                        {buttonText}
                    </button>
                )}
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