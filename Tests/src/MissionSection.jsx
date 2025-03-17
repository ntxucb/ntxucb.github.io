import React from 'react';
import styles from './MissionSection.module.css';

export default function MissionSection({children}){
    return <div className={styles["vision-mission-section"]}>
        {children}
    </div>
}