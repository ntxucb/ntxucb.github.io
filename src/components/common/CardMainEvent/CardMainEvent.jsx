import PropTypes from "prop-types";
import "./CardMainEvent.css";

// import imagenPrueba from "../../assets/images/Podcast1.png";


const CardMainEvent = ({ title, description, buttonText, onButtonClick }) => {
    return (
        <div className="container my-4 ">
            <div className="card border-0 shadow overflow-hidden">
                <div className="row g-0">
                    {/* Columna de Texto */}
                    <div className="col-lg-6 p-4 p-md-5 d-flex flex-column justify-content-center bg-gradient-primary text-black">
                        <div className="p-3">
                            <h2 className="display-5 mb-4 card-titulo">{title}</h2>
                            <p className="lead mb-4">
                                {description}
                            </p>
                            <button 
                                className=" btn-lg px-4 py-2 btn-registrate"
                                onClick={onButtonClick}
                            >
                                {buttonText} <i className="bi bi-arrow-up-right ms-2"></i>
                            </button>
                        </div>
                    </div>

                    {/* Columna de Imagen */}
                    <div className="col-lg-6">
                        <div className="h-100 overflow-hidden">
                            <img
                                src="https://anmdecolombia.org.co/wp-content/uploads/2021/07/el-cerebro.jpg"
                                alt="Neurotech"
                                className="img-fluid h-100 w-100 object-fit-cover"
                                style={{ minHeight: '300px' }}
                            />
                        </div>
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