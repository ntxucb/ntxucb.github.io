import React from "react";
import styles from "./CircularDescriptionContainer.module.css";

export default function CircularDescriptionContainer({
  title,
  left = 0,
  top = 0,
  radius = "400px",
  children,
}) {
  return (
    <div
      className={styles.circularContainer}
      style={{ left: left, top: top, height: radius }}
    >
      <div className={styles["inner-content"]}>
        <div className={styles["inner-column"]}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles["children-container"]}>{children}</div>
        </div>
      </div>
    </div>
  );
}
