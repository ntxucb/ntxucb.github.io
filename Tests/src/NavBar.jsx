import React from "react";
import styles from "./NavBar.module.css"

export default function NavBar() {
  return (
    <header className={styles["header"]}>
      <nav className={styles["navbar"]}>
        <div className={styles["logo"]}>
          <img src="Logo.png" alt="Neurotech UCB Logo" />
        </div>
        <ul className={styles["nav-links"]}>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#mission">Mission</a>
          </li>
          <li>
            <a href="#vision">Vision</a>
          </li>
          <li>
            <a href="#events">Events</a>
          </li>
          <li>
            <a href="#podcast">Podcast</a>
          </li>
          <li>
            <a href="#our-team">Our Team</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
