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

      <div className={styles["philosophy-section"]} >
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

      <div className={styles["testimonials-section"]} >
        <h2 className={styles["testimonials-section__title"]}>TESTIMONIALS</h2>
        <div className={styles["cards-container"]}>
          <div className={styles["testimonials-section__card"]}>
            <div className={styles["testimonials-section__card-picture"]}>
              <img src="assets/project-images/Portrait_Placeholder.png" alt="member picture" />
            </div>
            <div className={styles["testimonials-section__card-content"]}>
              <p className={styles["testimonials-section__card-description"]}>
                "I´m really proud of being part of this club. I´ve learned a lot of things that I didn´t even know existed. I´m really grateful for the opportunity to be here"
              </p>
              <p className={styles["testimonials-section__card-author"]}>
                - Juan Perez
              </p>
              <p className={styles["testimonials-section__card-position"]}>
                President of NTX UCB
              </p>
            </div>
          </div>
          <div className={styles["testimonials-section__card"]}>
            <div className={styles["testimonials-section__card-picture"]}>
              <img src="assets/project-images/Portrait_Placeholder.png" alt="member picture" />
            </div>
            <div className={styles["testimonials-section__card-content"]}>
              <p className={styles["testimonials-section__card-description"]}>
                "I´m really proud of being part of this club. I´ve learned a lot of things that I didn´t even know existed. I´m really grateful for the opportunity to be here"
              </p>
              <p className={styles["testimonials-section__card-author"]}>
                - Juan Perez
              </p>
              <p className={styles["testimonials-section__card-position"]}>
                President of NTX UCB
              </p>
            </div>
          </div>
          <div className={styles["testimonials-section__card"]}>
            <div className={styles["testimonials-section__card-picture"]}>
              <img src="assets/project-images/Portrait_Placeholder.png" alt="member picture" />
            </div>
            <div className={styles["testimonials-section__card-content"]}>
              <p className={styles["testimonials-section__card-description"]}>
                "I´m really proud of being part of this club. I´ve learned a lot of things that I didn´t even know existed. I´m really grateful for the opportunity to be here"
              </p>
              <p className={styles["testimonials-section__card-author"]}>
                - Juan Perez
              </p>
              <p className={styles["testimonials-section__card-position"]}>
                President of NTX UCB
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles["our-club-section"]}>
        <h3 className={styles["our-club-section__title"]}>OUR CLUB</h3>
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

      <div className={styles["news-section"]}>
        <h2 className={styles["news-section__title"]}>NEWS</h2>
        <div className={styles["news-section__new-container"]}>
          <div className={styles["news-section__new"]}>
            <div className={styles["news-section__new-image"]}>
              <img src="assets/project-images/wide_placeholder.webp" alt="new image" />
            </div>
            <div className={styles["news-section__new-content"]}>
              <h4 className={styles["news-section__new-title"]}>
                <a href="">
                  New project in the works
                </a>
              </h4>
              <p className={styles["news-section__new-date"]}>
                12/12/2021
              </p>
              <p className={styles["news-section__new-description"]}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
              </p>
            </div>
          </div>

          <div className={styles["news-section__new"]}>
            <div className={styles["news-section__new-image"]}>
              <img src="assets/project-images/wide_placeholder.webp" alt="new image" />
            </div>
            <div className={styles["news-section__new-content"]}>
              <h4 className={styles["news-section__new-title"]}>
                <a href="">
                  New project in the works
                </a>
              </h4>
              <p className={styles["news-section__new-date"]}>
                12/12/2021
              </p>
              <p className={styles["news-section__new-description"]}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
              </p>
            </div>
          </div>

          <div className={styles["news-section__new"]}>
            <div className={styles["news-section__new-image"]}>
              <img src="assets/project-images/wide_placeholder.webp" alt="new image" />
            </div>
            <div className={styles["news-section__new-content"]}>
              <h4 className={styles["news-section__new-title"]}>
                <a href="">
                  New project in the works
                </a>
              </h4>
              <p className={styles["news-section__new-date"]}>
                12/12/2021
              </p>
              <p className={styles["news-section__new-description"]}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
              </p>
            </div>
          </div>

        </div>
      </div>

      <div className={styles["join-us-section"]}>
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

      <div className={styles["sponsors-section"]}>
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


      {/* <MainLogo
        next={() => {
          sectionRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "start",
          });
        }}
      /> */}

      {/* <CircleSection>
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
      </MissionSection> */}
      {/* <div className={styles["scroll-view"]} ref={scrollRef}>
       
      </div> */}
    </div>
  );
};

export default HomePage;
