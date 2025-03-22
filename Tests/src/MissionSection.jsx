import React, { forwardRef } from "react";
import styles from "./MissionSection.module.css";

function MissionSection({ children}, ref) {
  function attachRefs(node) {
    ref.current = node;
  }
  return <div className={styles["vision-mission-section"]} ref={ref}>{children}</div>;
}


const MissionSectionComp = forwardRef(MissionSection)
export default MissionSectionComp;