import React, { useEffect, useRef, useState } from "react";
import styles from "./Home.module.css";
import QuoteCard from "../../components/common/QuoteCard/QuoteCard";
import InfoCard from "../../components/common/InfoCard/InfoCard";
import FeatureCard from "../../components/common/FeatureCard/FeatureCard";
import TeamSectionComp from "../../components/common/TeamSection/TeamSection";
import EventModal from "../../components/common/EventModal/EventModal";
import neuroxplore_banner from "../../assets/images/neuroxplore/events/wide/1.png"
import AndresAracena from "../../assets/images/neuroxplore/organizers/Andres-Aracena-Ocampo-President.jpg"
import NeurotechUCB from "../../assets/logos/NeuroTechUCB.png";
import { useNavigate } from "react-router-dom";
import fundador from "../../assets/images/fundador.jpeg"
import { Helmet } from "react-helmet-async";

const HomePage = () => {
  const scrollRef = useRef();
  const canvasRef = useRef();
  const sectionRef = useRef();

  const [backgroundProgress, setBackgroundProgress] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

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

      <Helmet>
        <title>Neurotech UCB | Innovación en Neurotecnología</title>
        <meta
          name="description"
          content="Neurotech UCB es la iniciativa estudiantil de neurotecnología de la Universidad Católica Boliviana. Organizamos eventos, talleres y promovemos la innovación científica en Bolivia."
        />
        <meta name="keywords" content="neurotecnología, neurotech, inteligencia artificial, ciencia de datos, club estudiantil, neurociencia, UCB Bolivia, NeurotechX" />
        <meta name="author" content="Neurotech UCB" />

        {/* Open Graph para redes sociales */}
        <meta property="og:title" content="Neurotech UCB | Innovación en Neurotecnología" />
        <meta property="og:description" content="Descubre el club de neurotecnología de la UCB: eventos, formación, comunidad y ciencia al servicio del futuro." />
        <meta property="og:image" content="https://ntxucb.github.io/assets/images/neuroxplore/events/wide/1.png" />
        <meta property="og:url" content="https://ntxucb.github.io/" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Neurotech UCB | Innovación en Neurotecnología" />
        <meta name="twitter:description" content="Únete a la comunidad de estudiantes que está revolucionando la neurociencia en Bolivia a través de la tecnología." />
        <meta name="twitter:image" content="https://ntxucb.github.io/assets/images/neuroxplore/events/wide/1.png" />
      </Helmet>

      <EventModal isOpen={isModalOpen} onClose={handleCloseModal} onClick={() => {
        navigate('/events/1');
      }} image={neuroxplore_banner} title="NEUROXPLORE" date="28 de abril - 10 de mayo" description="Evento insignia organizado por el club Neurotech UCB con el objetivo de fomentar la innovación, el conocimiento y" highlighted="el desarrollo de soluciones tecnológicas aplicadas a la neurociencia." continueDescription="Incluye formación virtual, exposiciones de proyectos, actividades prácticas y una hackathon intensiva." />


      <div className={styles["hero-banner"]}>
        <div className={styles["hero-banner__content"]}>
          <h1 className={styles["hero-banner__title"]}> NEUROTECH UCB </h1>
          <p className={styles["hero-banner__description"]}>
            <span className={styles["hero-banner__description--highlight"]}>
              Neurotechnology Innovative Club
            </span>

            Workshops, events and scientific outreach
          </p>

          <div className={styles["hero-banner__cta"]}>
            <a href="#about" className={styles["hero-banner__cta-button"]}>
              More Info
            </a>
          </div>
        </div>
        <div className={styles["hero-banner__logo"]}>
          <img src={NeurotechUCB} alt="Logo" />
        </div>
      </div>

      <div className={styles["section-container--row"]} id="about">
        <div className={styles["about-section__image"]}>
          <img src="assets/images/image1.png" alt="Logo" />
        </div>
        <div className={styles["about-section__content"]}>
          <h2 className={styles["section-container__title"]}>ABOUT NeuroTechUCB</h2>
          <p className={styles["about-section__description"]}>
          NeuroTechUCB is a student-led neurotechnology initiative at the Universidad Católica Boliviana “San Pablo” in La Paz, Bolivia. We are dedicated to exploring the intersection between neuroscience, technology, and data science through hands-on projects, education, and community outreach.
          </p>
          <p className={styles["about-section__description"]}>
          Founded in 2021 during the COVID-19 lockdown, NeuroTechUCB emerged from the shared curiosity and passion for neuroscience and data-driven innovation among a group of Psychology students. Since then, we have grown into a multidisciplinary team that brings together students from Biomedical Engineering, Psychology, Computer Science, and other fields.
          </p>
          <p className={styles["about-section__description"]}>
          As the first NeuroTechX chapter in Bolivia, we are proud to be part of the global NeuroTechX network, promoting open knowledge, interdisciplinary collaboration, and technological development in neuroscience.
          </p>


          {/* <div className={styles["about-section__cta"]}>
            <a href="#mission" className={styles["about-section__cta-button"]}>
              More Info
            </a>
          </div> */}
        </div>
      </div>

      <div className={styles["section-container--row"]} id="philosophy">

        <FeatureCard
          number={1}
          title="Mission"
          description="To promote research, education and practical application of neurotechnology in Bolivia through a multidisciplinary approach, offering academic events, networking and student participation opportunities."
        />

        <FeatureCard
          number={2}
          title="Vision"
          description="To be recognized as leaders in the promotion and application of neurotechnology in the Latin American community, driving significant advances that improve people's quality of life and promote sustainable. development in our region."
        />

        <FeatureCard
          number={3}
          title="Values"
          description="Our 3 pilars are:"
          list={["Community", "Education", "Professional development"]}
        />

      </div>

      <div className={styles["section-container--column"]} id="testimonials">
        <h2 className={styles["section-container__title"]}>TESTIMONIALS</h2>
        <div className={styles["cards-container"]}>
          <QuoteCard
            image={AndresAracena}
            quote={"Seeing each team member grow, take on challenges, and turn ideas into real projects is what inspires me most. It’s an honor to support a brilliant team that innovates with purpose and vision."}
            name="Andres Aracena Ocampo"
            position="President - NeuroTechUCB"
          />
          <QuoteCard
            image={fundador}
            quote={"Founding this club has been a dream come true — uniting passionate students from all fields to explore neurotechnology together. I love seeing how curiosity and collaboration spark innovation and purpose in our community."}
            name="Manuel Illanes"
            position="Cofounder - NeuroTechUCB"
          />
          {/* <QuoteCard
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
          /> */}
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
            image="assets/images/congresoNeurociencias.png"
            title="Invitación a Congreso de Neurociencia"
            link="#"
            date="19/02/2025"
            description="No te pierdas el I Congreso Latinoamericano de Neurociencias Cognitivas, organizado por @NeuroTransmitiendo! Este congreso es una oportunidad única para reunir a la comunidad de neurociencias cognitivas de LATAM."
          />

          <InfoCard
            image="assets/images/nuevosmiembros.png"
            title="Convocatoria de nuevos miembros"
            link="#"
            date="11/02/2025"
            description="¿Tienes curiosidad por la Neurociencia, la Inteligencia Artificial y la Ciencia de Datos?Neurotech UCB te invita a unirte a nuestra increíble comunidad y explorar el fascinante mundo de la neurotecnología. "
          />

          <InfoCard
            image="assets/images/medusa.png"
            title="New project in the works"
            link="#"
            date="16/11/2024"
            description="Estamos buscando voluntarios para participar en el Proyecto Medusa, un estudio que evalúa cómo el bilingüismo (Español e Inglés) puede influir en la memoria y el desempeño cognitivo."
          />

        </div>
      </div>

      <div className={styles["join-us-section"]} id="join-us">
        <div className={styles["join-us-section__content"]}>
          <h2 className={styles["join-us-section__title"]}>JOIN US</h2>
          <p className={styles["join-us-section__description"]}>
          Are you curious about Neuroscience, Artificial Intelligence, and Data Science?
            Neurotech UCB invites you to join our incredible community and explore the fascinating world of neurotechnology.
            <span className={styles["join-us-section__description--highlight"]}>
            We accept new members on summer and winter breaks
              </span>
            
 </p>
          <p className={styles["join-us-section__description"]}>
            We are looking for students for the following areas:
            <span className={styles["join-us-section__description--highlight"]}>
              SOCIAL MEDIA, SOFTWARE,  DATA SCIENCE, HARDWARE, OUTREACH, EDUCATION
            </span>
          </p>

          <div className={styles["join-us-section__cta"]}>
            <a href="https://forms.gle/iYNsm8o79msEt6Pc9" className={styles["join-us-section__cta-button"]} target="_blank">
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
