import React, { forwardRef } from "react";
import BentoGrid from "../../components/layout/BentoGallery/BentoGallery";
import styles from "./TeamSection.module.css";
function TeamSection({ layout, images }, ref) {
  return (
    <div className={styles["section-container"]} ref={ref}>
      <div className={styles["background-container"]} />
      <div className={styles["title-container"]}>
        <h1 className={styles.title}>Our Club</h1>
      </div>
      <BentoGrid layout={layout} images={images}></BentoGrid>
    </div>
  );
}

const TeamSectionComp = forwardRef(TeamSection);
export default TeamSectionComp;
