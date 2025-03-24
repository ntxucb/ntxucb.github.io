import React from "react";
import styles from "./DendriteContainer.module.css";

export default function DendriteContainer({ title, children, width, height, direction=false}) {
    
  return (
    <div className={styles.dendriteContainer} style={
        { width: width,
            height: height,
            '--left-pos': direction? "15%": "30%",
            '--right-pos': direction? "30%": "15%",
            '--text-align': direction? 'start': 'end',
            '--flip-direction': direction? -1: 1,
            '--self-align': direction? 'end': 'start',
          }}>
      <div className={styles.innerContent}>
        <h1 className={styles.title}>{title}</h1>
        {children}
      </div>
    </div>
  );
}
