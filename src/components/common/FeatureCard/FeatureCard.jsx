import React from "react";
import styles from "./FeatureCard.module.css";

const FeatureCard = ({ number, title, description, list }) => {
  return (
    <div className={styles["feature-card"]}>
      <div className={styles["feature-card__number"]}>
        <span>{"0" + number}</span>
      </div>
      <div className={styles["feature-card__content"]}>
        <h3 className={styles["feature-card__title"]}>{title}</h3>
        <p className={styles["feature-card__description"]}>{description}</p>
        {list && (
          <ul className={styles["feature-card__list"]}>
            {list.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FeatureCard;