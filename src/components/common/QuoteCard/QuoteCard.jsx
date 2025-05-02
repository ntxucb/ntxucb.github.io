import React from "react";
import styles from "./QuoteCard.module.css";

const QuoteCard = ({ image, quote, name, position }) => {
    return (
        <div className={styles["quote__card"]}>
            <div className={styles["quote__card-picture"]}>
                <img src={image} alt={name} />
            </div>
            <div className={styles["quote__card-content"]}>
                <p className={styles["quote__card-description"]}>{quote}</p>
                <p className={styles["quote__card-author"]}>- {name}</p>
                <p className={styles["quote__card-position"]}>{position}</p>
            </div>
        </div>
    );
}

export default QuoteCard;