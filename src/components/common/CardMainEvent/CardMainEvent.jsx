import PropTypes from "prop-types";
import "./CardMainEvent.css";

// import imagenPrueba from "../../assets/images/Podcast1.png";


const CardMainEvent = ({ title, description, buttonText, onButtonClick }) => {
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
                    <div className="col-md-6">
                        <img
                            // src={imagenPrueba || image}
                            src="https://anmdecolombia.org.co/wp-content/uploads/2021/07/el-cerebro.jpg"
                            alt="Neurotech"
                            className="img-fluid card-img"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
// ✅ Validación de los props con PropTypes
CardMainEvent.propTypes = {
    title: PropTypes.string.isRequired,         // title debe ser un string obligatorio
    description: PropTypes.string,              // description es un string opcional
    image: PropTypes.string,                    // image es un string opcional
    buttonText: PropTypes.string,               // buttonText es un string opcional
    onButtonClick: PropTypes.func               // onButtonClick es una función opcional
};

export default CardMainEvent;