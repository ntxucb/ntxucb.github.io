import React from "react";
import styles from "./DendriteContainer.module.css";
import CircularDescriptionContainer from "./CircularDescriptionContainer";

export default function DendriteContainer({
  title,
  left = 0,
  top = 0,
  radius = "400px",
  children,
  direction = false,
}) {
  return (
    <div
      className={styles.dendriteContainer}
      style={{
        "--left-pos": direction ? "15%" : "30%",
        "--right-pos": direction ? "30%" : "15%",
        "--text-align": direction ? "start" : "end",
        "--flip-direction": direction ? -1 : 1,
        "--self-align": direction ? "end" : "start",
      }}
    >
      <CircularDescriptionContainer title={title} top={top} left={left} radius={radius}>
        {children}
      </CircularDescriptionContainer>
    </div>
  );
}
