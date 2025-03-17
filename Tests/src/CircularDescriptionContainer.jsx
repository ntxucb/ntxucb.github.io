import React from 'react';
import styles from './CircularDescriptionContainer.module.css';

export default function CircularDescriptionContainer({title, left, top = 0, radius = "400px", children}){
    return <div className={styles.circularContainer} style={{left: left, top:top, height: radius}} >
        <h1 className={styles.title}>{title}</h1>
        {children}  
    </div>
}