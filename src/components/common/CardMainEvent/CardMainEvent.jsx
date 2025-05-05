import PropTypes from "prop-types";
import "./CardMainEvent.css";
// import imagenPrueba from "../../assets/images/Podcast1.png";
const CardMainEvent = ({ title, description, buttonText, onButtonClick, date, location }) => {
    return (
        <div className="container my-4">
            <div className="card border-0 shadow overflow-hidden">
                <div className="row g-0">
                    {/* Columna de Texto */}
                    <div className="col-lg-6 p-4 p-md-5 d-flex flex-column justify-content-center bg-gradient-primary text-black">
                        <div className="p-3">
                            <h2 className="display-5 mb-3 card-titulo">{title}</h2>
                            {/* Ubicación */}
                            <div className="d-flex align-items-center mb-4">
                                <i className="bi bi-geo-alt-fill me-2 text-info    "></i>
                                <span className="text-info fw-regular">{location}</span>
                            </div>
                            <p className="lead mb-4 text-dark">
                                {description}
                            </p>
                            {/* Badge de Fecha */}
                            <div className="mb-3">
                                <span className="badge bg-secondary bg-opacity-10 text-secondary fs-6 fw-normal mb-2">
                                    <i className="bi bi-calendar3 me-2"></i>
                                    {date}
                                </span>
                            </div>
                            <button className="btn-lg px-4 py-2 btn-registrate" onClick={onButtonClick}> {buttonText} <i className="bi bi-arrow-up-right ms-2"></i> </button>
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
// Validación de los props con PropTypes
CardMainEvent.propTypes = {
    title: PropTypes.string.isRequired,         // title debe ser un string obligatorio
    description: PropTypes.string,              // description es un string opcional
    image: PropTypes.string,                    // image es un string opcional
    buttonText: PropTypes.string,               // buttonText es un string opcional
    onButtonClick: PropTypes.func               // onButtonClick es una función opcional
};

export default CardMainEvent;