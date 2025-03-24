import React, { forwardRef, useEffect, useRef } from "react";
import styles from "./MissionSection.module.css";
import TeamSectionComp from "./TeamSection";

function MissionSection({ children, setProgress, progress }, ref) {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const initialOffset = useRef(null);

  function attachRefs(node) {
    if (ref) ref.current = node;
    sectionRef.current = node;
  }

  useEffect(function () {
    const stickyRect = stickyRef.current.getBoundingClientRect();
    const sectionRect = sectionRef.current.getBoundingClientRect();
    initialOffset.current = stickyRect.top - sectionRect.top;

    const updatePogress = () => {
      const stickyRect = stickyRef.current.getBoundingClientRect();
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const totalProgress = sectionRect.height;
      const stickyHeight = stickyRect.height;
      const startPosition = sectionRect.top;
      const currentPosition = stickyRect.top;

      let progress =
        (currentPosition - startPosition - initialOffset.current - 300) /
        (totalProgress - stickyHeight - initialOffset.current);
      progress = Math.max(0, Math.min(1, 2 * progress));

      setProgress(progress);
      requestAnimationFrame(updatePogress);
    };

    requestAnimationFrame(updatePogress);
  }, []);
  return (
    <div className={styles["vision-mission-section"]} ref={attachRefs}>
      <div
        className={styles["sticky-container"]}
        ref={stickyRef}
        style={{
          opacity: 1 - progress,
          "--hide-translate": `${(progress * 100).toFixed(0)}%`,
        }}
      >
        {children}
      </div>

      <TeamSectionComp
        layout={["'a a b'", "'a a c'", "'d e e'"]}
        images={[
          { gridArea: "b", url: "team1.png" },
          { gridArea: "c", url: "team2.png" },
          { gridArea: "a", url: "team3.png" },
          { gridArea: "d", url: "team4.png" },
          { gridArea: "e", url: "team5.png" },
        ]}
      />
    </div>
  );
}

const MissionSectionComp = forwardRef(MissionSection);
export default MissionSectionComp;
