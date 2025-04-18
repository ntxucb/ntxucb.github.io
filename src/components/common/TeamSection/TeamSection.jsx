import React, { forwardRef } from "react";
import styles from "./TeamSection.module.css";
import BentoGrid from "../../layout/BentoGallery/BentoGallery";
function TeamSection({ layout, images }, ref) {
  return (
    <div className={styles["section-container"]} ref={ref}>
      <div className={styles["grid-container"]}>
      <BentoGrid layout={layout} images={images}></BentoGrid>
      </div>
    </div>
  );
}

const TeamSectionComp = forwardRef(TeamSection);
export default TeamSectionComp;
