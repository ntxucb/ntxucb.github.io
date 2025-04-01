import React, { useEffect, useRef, useState } from "react";
import styles from "./Home.module.css";
import CanvasTest from "./CanvasTest";
import CircularDescriptionContainer from "./CircularDescriptionContainer";
import DendriteContainer from "./DendriteContainer";
import CircleSection from "./CirclesSection";
import MissionSection from "./MissionSection";
import MainLogo from "./MainLogo";
import NavBar from "./NavBar";
import TeamSection from "./TeamSection";
import { TaskBar } from "../../components/layout/TaskBar/TaskBar";
import Footer from "../../components/layout/Footer/Footer";
import TeamSectionComp from "./TeamSection";
import QuoteCard from "../../components/common/QuoteCard/QuoteCard";
import InfoCard from "../../components/common/InfoCard/InfoCard";

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

      <div className={styles["section-container--row"]} id="about">
        <div className={styles["about-section__image"]}>
          <img src="src/assets/images/image1.png" alt="Logo" />
        </div>
        <div className={styles["about-section__content"]}>
          <h2 className={styles["section-container__title"]}>ABOUT NTX UCB</h2>
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

      <div className={styles["section-container--row"]} id="philosophy">

        <div className={styles["philosophy-section__card"]}>
          <div className={styles["philosophy-section__card-number"]}>
            <span>01</span>
          </div>
          <div className={styles["philosophy-section__card-content"]}>
            <h3 className={styles["philosophy-section__card-title"]}>Mission</h3>
            <p className={styles["philosophy-section__card-description"]}>
              To promote research, education and practical application of neurotechnology in La Paz through a multidisciplinary approach, offering academic events, networking and student participation opportunities.
            </p>
          </div>
        </div>

        <div className={styles["philosophy-section__card"]}>
          <div className={styles["philosophy-section__card-number"]}>
            <span>02</span>
          </div>
          <div className={styles["philosophy-section__card-content"]}>
            <h3 className={styles["philosophy-section__card-title"]}>Vision</h3>
            <p className={styles["philosophy-section__card-description"]}>
              To be recognized as a leading student initiative in the field of neurotechnology in La Paz, Bolivia, promoting research, education and practical application of neurotechnology through a multidisciplinary approach.
            </p>
          </div>
        </div>

        <div className={styles["philosophy-section__card"]}>
          <div className={styles["philosophy-section__card-number"]}>
            <span>03</span>
          </div>
          <div className={styles["philosophy-section__card-content"]}>
            <h3 className={styles["philosophy-section__card-title"]}>Values</h3>
            <p className={styles["philosophy-section__card-description"]}>
              Our 3 pilars are:
            </p>
            <ul className={styles["philosophy-section__card-description"]}>
              <li>COMUNNITY</li>
              <li>INNOVATION</li>
              <li>EDUCATION</li>
            </ul>
          </div>
        </div>

      </div>

      <div className={styles["section-container--column"]} id="testimonials">
        <h2 className={styles["section-container__title"]}>TESTIMONIALS</h2>
        <div className={styles["cards-container"]}>
          <QuoteCard
            image="assets/project-images/Portrait_Placeholder.png"
            quote={"I´m really proud of being part of this club. I´ve learned a lot of things that I didn´t even know existed. I´m really grateful for the opportunity to be here"}
            name="Juan Perez"
            position="President of NTX UCB"
          />
          <QuoteCard
            image="assets/project-images/Portrait_Placeholder.png"
            quote={"I´m really proud of being part of this club. I´ve learned a lot of things that I didn´t even know existed. I´m really grateful for the opportunity to be here"}
            name="Juan Perez"
            position="President of NTX UCB"
          />
          <QuoteCard
            image="assets/project-images/Portrait_Placeholder.png"
            quote={"I´m really proud of being part of this club. I´ve learned a lot of things that I didn´t even know existed. I´m really grateful for the opportunity to be here"}
            name="Juan Perez"
            position="President of NTX UCB"
          />
        </div>
      </div>

      <div className={styles["section-container--column"]} id="our-club">
        <h3 className={styles["section-container__title"]}>OUR CLUB</h3>
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

      <div className={styles["section-container--column"]} id="news">
        <h2 className={styles["section-container__title"]}>NEWS</h2>
        <div className={styles["news-section__new-container"]}>
          
          <InfoCard
            image="assets/project-images/wide_placeholder.webp"
            title="New project in the works"
            link="#"
            date="12/12/2021"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod."
          />

          <InfoCard
            image="assets/project-images/wide_placeholder.webp"
            title="New project in the works"
            link="#"
            date="12/12/2021"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod."
          />

          <InfoCard
            image="assets/project-images/wide_placeholder.webp"
            title="New project in the works"
            link="#"
            date="12/12/2021"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod."
          />

        </div>
      </div>

      <div className={styles["join-us-section"]} id="join-us">
        <div className={styles["join-us-section__content"]}>
          <h2 className={styles["join-us-section__title"]}>JOIN US</h2>
          <p className={styles["join-us-section__description"]}>
            Are you curious about Neuroscience, Artificial Intelligence, and Data Science?
            Neurotech UCB invites you to join our incredible community and explore the fascinating world of neurotechnology.
          </p>
          <p className={styles["join-us-section__description"]}>
            We are looking for students for the following areas:
            <span className={styles["join-us-section__description--highlight"]}>
              SOCIAL MEDIA, SOFTWARE,  DATA SCIENCE, HARDWARE ENGINEERING, OUTREACH, EDUCATION
            </span>
          </p>

          <div className={styles["join-us-section__cta"]}>
            <a href="#join" className={styles["join-us-section__cta-button"]}>
              Join Us
            </a>
          </div>
        </div>
      </div>

      <div className={styles["sponsors-section"]} id="our-sponsors">
        <h2 className={styles["sponsors-section__title"]}>Our Sponsors</h2>
        <div className={styles["sponsors-section__logos"]}>
          <img src="src/assets/logos/NTX_Logo.png" alt="Logo" />
          <img src="src/assets/logos/UIELogo.png" alt="Logo" />
          <img src="src/assets/logos/UCB.png" alt="Logo" />
          <img src="src/assets/logos/cidimec.png" alt="Logo" />
          <img src="src/assets/logos/backyardbrains.png" alt="Logo" />
          <img src="src/assets/logos/tinyml.png" alt="Logo" />
          <img src="src/assets/logos/openbci.png" alt="Logo" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
