import React, { useEffect, useRef, useState } from "react";
import styles from "./Home.module.css";
import CanvasTest from "./CanvasTest";
import CircularDescriptionContainer from "./CircularDescriptionContainer";
import DendriteContainer from "./DendriteContainer";
import CircleSection from "./CirclesSection";
import MissionSection from "./MissionSection";
import MainLogo from "./MainLogo";
import NavBar from "./NavBar";
import BentoGrid from "../../components/layout/BentoGallery/BentoGallery";
import TeamSection from "./TeamSection";

const HomePage = () => {
  const scrollRef = useRef();
  const canvasRef = useRef();
  const sectionRef = useRef();

  const [backgroundProgress, setBackgroundProgress] = useState(0);

  useEffect(function () {
    const scrollView = scrollRef.current;
    const canvasView = canvasRef.current;
    const sectionView = sectionRef.current;

    function checkScroll() {
      const sectionBottom = sectionView.getBoundingClientRect().bottom;
      const canvasHeight = canvasView.getBoundingClientRect().height;
      const offsetY = Math.min(0, -(canvasHeight - sectionBottom));
      canvasView.style.top = `${offsetY}px`;
    }
    scrollView.addEventListener("scroll", checkScroll);
    return () => {
      scrollView.removeEventListener("scroll", checkScroll);
    };
  }, []);

  return (
    <div className={styles["landing-page"]}>
      <CanvasTest ref={canvasRef}  progress={backgroundProgress}/>
      <div className={styles["scroll-view"]} ref={scrollRef}>
        <NavBar />

        <MainLogo
          next={() => {
            sectionRef.current.scrollIntoView({
              behavior: "smooth",
              block: "start",
              inline: "start",
            });
          }}
        />

        <CircleSection>
          <CircularDescriptionContainer
            title="NEUROTECH UCB"
            left={"5svw"}
            radius={"40svw"}
            top={"100px"}
          >
            <p>
              NeurotechUCB is the neurotechnology student initiative from UCB.
              Our goal is to work on issues related to neuroscience with a
              techonological and data-oriented approach. We aim to develop
              innovative solutions, and train others with the same goal. We are
              located in La Paz, Bolivia.
            </p>
          </CircularDescriptionContainer>

          <CircularDescriptionContainer
            title="HISTORY"
            left={"55svw"}
            top={"100px"}
            radius={"40svw"}
          >
            <p>
              NeurotechUCB was born on 2021, during the COVID-19 lock down.
              Mainly driven by curiosity for Neuroscience, a group of university
              students founded the first NeurotechX club in Bolivia.
              <br />
              We have participated in many events related to Neuroscience and
              Neurotechnology. And even got to win an award in the 2024 FUNTEC
              FEST with one of our projects.
            </p>
          </CircularDescriptionContainer>
        </CircleSection>

        <MissionSection setProgress={setBackgroundProgress} progress={backgroundProgress}         ref={sectionRef}>
          <DendriteContainer 
          title={"MISSION"} 
          top={"100px"}
          radius={"40svw"}>
            <p>
              To promote research, education and practical application of
              neurotechnology in La Paz through a multidisciplinary approach,
              offering academic events, networking and student participation
              opportunities.
            </p>
          </DendriteContainer>
          <DendriteContainer
            title={"VISION"}
            top={"100px"}
            radius={"40svw"}
            direction={true}
          >
            <p>
              To promote research, education and practical application of
              neurotechnology in La Paz through a multidisciplinary approach,
              offering academic events, networking and student participation
              opportunities.
            </p>
          </DendriteContainer>
        </MissionSection>
          
      </div>
    </div>
  );
};

export default HomePage;
