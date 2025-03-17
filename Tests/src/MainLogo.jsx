import React from "react";
import styles from './MainLogo.module.css'

export default function MainLogo() {
  return (
    <div className={styles["neuron-illustration"]}>
      <img src="Logo.png" alt="Logo" />
      <h1 className={styles["title"]}>
        NEUROTECH
        <br /> UCB
      </h1>
      <div className={styles["scroll-indicator"]}>
        <img src="Arrow.png" height={40} />
      </div>
    </div>
  );
}
