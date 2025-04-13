import PropTypes from "prop-types";
import "./CardMainEvent.css";

const CardMainEvent = ({ title, description, image, buttonText, onButtonClick }) => {
    return (
        <div className="container alto">
            <div className="card card-principal">
                <div className="row g-0">

                    {/* Columna de Texto */}
                    <div className="col-md-6 d-flex align-items-center text-container">
                        <div className="card-body">
                            <h2 className="card-title">{title}</h2>
                            <p className="card-text">
                                {description}
                            </p>
                            <button className="btn btn-primary" onClick={onButtonClick}>{buttonText}</button>
                        </div>
                    </div>

                    {/* Columna de Imagen */}
                    <div className="col-md-6 card-img-container">
                        <img
                            src={image}
                            alt="Neurotech"
                            className="img-fluid card-img"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

CardMainEvent.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    image: PropTypes.string,
    buttonText: PropTypes.string,
    onButtonClick: PropTypes.func
};

export default CardMainEvent;