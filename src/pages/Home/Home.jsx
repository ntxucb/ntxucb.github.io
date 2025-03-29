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
import { TaskBar } from "../../components/layout/TaskBar/TaskBar";
import Footer from "../../components/layout/Footer/Footer";

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
    <div className={styles["landing-page scroll-view"]} ref={scrollRef}>
      {/* <CanvasTest ref={canvasRef}  progress={backgroundProgress}/> */}

      <div className={styles["hero-banner"]}>
        <div className={styles["hero-banner__content"]}>
          <h1 className={styles["hero-banner__title"]}> NEUROTECHX UCB </h1>
          <p className={styles["hero-banner__description"]}>
            <span className={styles["hero-banner__description--highlight"]}>
              Neurotechnology Innovative Club
            </span>

            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </p>

          <div className={styles["hero-banner__cta"]}>
            <a href="#about" className={styles["hero-banner__cta-button"]}>
              More Info
            </a>
          </div>
        </div>
        <div className={styles["hero-banner__logo"]}>
          <img src="assets/logos/NTX_BLUE.png" alt="Logo" />
        </div>
      </div>

      <div className={styles["about-section"]}>
        <div className={styles["about-section__image"]}>
          <img src="src/assets/images/image1.png" alt="Logo" />
        </div>
        <div className={styles["about-section__content"]}>
          <h2 className={styles["about-section__title"]}>ABOUT NTX UCB</h2>
          <p className={styles["about-section__description"]}>
            NeurotechX UCB is the neurotechnology student initiative from Universidad Católica Boliviana “San Pablo” in La Paz, Bolivia. Our club goal is to work on issues related to neuroscience with a technological and data-oriented approach. We aim to develop innovative solutions, and train others with the same goal.
          </p>
          <p className={styles["about-section__description"]}>
            NTX UCB was born on 2021, during the COVID-19 lock down. It was formed due to the curiosity for Neuroscience and Data Science from a group of Psychology students of the UCB. We were the first NeurotechX club in Bolivia, and we´re really proud of it.
          </p>

          <div className={styles["about-section__cta"]}>
            <a href="#mission" className={styles["about-section__cta-button"]}>
              More Info
            </a>
          </div>
        </div>
      </div>

      {/* <MainLogo
        next={() => {
          sectionRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "start",
          });
        }}
      /> */}

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

      <MissionSection setProgress={setBackgroundProgress} progress={backgroundProgress} ref={sectionRef}>
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
      {/* <div className={styles["scroll-view"]} ref={scrollRef}>
       
      </div> */}
    </div>
  );
};

export default HomePage;
