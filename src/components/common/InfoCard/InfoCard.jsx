import React from "react";
import styles from "./InfoCard.module.css"; // Asegúrate de importar los estilos

const InfoCard = ({ image, title, link, date, description }) => {
  return (
    <div className={styles["info-card"]}>
      <div className={styles["info-card__image"]}>
        <img src={image} alt={title} />
      </div>
      <div className={styles["info-card__content"]}>
        <h4 className={styles["info-card__title"]}>
          <a href={link}>{title}</a>
        </h4>
        <p className={styles["info-card__date"]}>{date}</p>
        <p className={styles["info-card__description"]}>{description}</p>
      </div>
    </div>
  );
};

export default InfoCard;
