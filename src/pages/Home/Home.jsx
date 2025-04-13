import React, { useEffect, useRef, useState } from "react";
import styles from "./Home.module.css";
import QuoteCard from "../../components/common/QuoteCard/QuoteCard";
import InfoCard from "../../components/common/InfoCard/InfoCard";
import FeatureCard from "../../components/common/FeatureCard/FeatureCard";
import TeamSectionComp from "../../components/common/TeamSection/TeamSection";
import EventModal from "../../components/common/EventModal/EventModal";
import neuroxplore_banner from "../../assets/images/neuroxplore/banner.png";

const HomePage = () => {
  const scrollRef = useRef();
  const canvasRef = useRef();
  const sectionRef = useRef();

  const [backgroundProgress, setBackgroundProgress] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    const yaVisto = localStorage.getItem("eventoVisto");
    const yaMostradoEstaSesion = sessionStorage.getItem("eventModalShown");

    if (!yaVisto && !yaMostradoEstaSesion) {
      setTimeout(() => setIsModalOpen(true), 1000);
      sessionStorage.setItem("eventModalShown", "true");
    }
  }, []);

  const handleCloseModal = () => {
    localStorage.setItem("eventoVisto", "true");
    setIsModalOpen(false);
  };

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("eventModalShown");
    if (!alreadyShown) {
      setTimeout(() => setShowModal(true), 1000);
      sessionStorage.setItem("eventModalShown", "true");
    }
  }, []);

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

      <EventModal isOpen={isModalOpen} onClose={handleCloseModal} onClick={() => {
        window.location.href = `/ntxucblapaz.github.io/events/1`;
      }} image={neuroxplore_banner} title="NEUROXPLORE" date="29 de abril - 10 de mayo" description="Evento insignia organizado por el club Neurotech UCB con el objetivo de fomentar la innovación, el conocimiento y" highlighted="el desarrollo de soluciones tecnológicas aplicadas a la neurociencia." continueDescription="Incluye formación virtual, exposiciones de proyectos, actividades prácticas y una hackathon intensiva." />


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
          <img src="assets/images/image1.png" alt="Logo" />
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

        <FeatureCard
          number={1}
          title="Mission"
          description="To promote research, education and practical application of neurotechnology in La Paz through a multidisciplinary approach, offering academic events, networking and student participation opportunities."
        />

        <FeatureCard
          number={2}
          title="Vision"
          description="To be recognized as a leading student initiative in the field of neurotechnology in La Paz, Bolivia, promoting research, education and practical application of neurotechnology through a multidisciplinary approach."
        />

        <FeatureCard
          number={3}
          title="Values"
          description="Our 3 pilars are:"
          list={["COMMUNITY", "INNOVATION", "EDUCATION"]}
        />

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
            { gridArea: "b", url: "assets/images/team1.png" },
            { gridArea: "c", url: "assets/images/team2.png" },
            { gridArea: "a", url: "assets/images/team3.png" },
            { gridArea: "d", url: "assets/images/team4.png" },
            { gridArea: "e", url: "assets/images/team5.png" },
          ]}
        />
      </div>

      <div className={styles["section-container--column"]} id="news">
        <h2 className={styles["section-container__title"]}>NEWS</h2>
        <div className={styles["cards-container--column"]}>

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
          <img src="assets/logos/NTX_Logo.png" alt="Logo" />
          <img src="assets/logos/UIELogo.png" alt="Logo" />
          <img src="assets/logos/UCB.png" alt="Logo" />
          <img src="assets/logos/cidimec.png" alt="Logo" />
          <img src="assets/logos/backyardbrains.png" alt="Logo" />
          <img src="assets/logos/tinyml.png" alt="Logo" />
          <img src="assets/logos/openbci.png" alt="Logo" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
