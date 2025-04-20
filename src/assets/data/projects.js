import neuroxplore_banner_sqd from "../images/neuroxplore/events/squared/1.png"
import neuroxplore_banner_wide from "../images/neuroxplore/events/wide/1.png"
import bootcamp_sqd from "../images/neuroxplore/events/squared/2.png"
import bootcamp_wide from "../images/neuroxplore/events/wide/2.png"
import feria_sqd from "../images/neuroxplore/events/squared/3.png"
import feria_wide from "../images/neuroxplore/events/wide/3.png"
import diseccion_sqd from "../images/neuroxplore/events/squared/4.png"
import diseccion_wide from "../images/neuroxplore/events/wide/5.png"
import hackathon_sqd from "../images/neuroxplore/events/squared/5.png"
import hackathon_wide from "../images/neuroxplore/events/wide/4.png"
import squared_placeholder from "../images/placeholder-cuadrado.jpg";
import portrait_placeholder from "../images/Portrait_Placeholder.png";
import wide_placeholder from "../images/wide_placeholder.webp"

export const ongoingProjects = [
    {
        id: 1,
        title: "NeurotechUCB Project Symposium",
        isOutstanding: true,
        description:
            "Del 28 de abril al 10 de mayo, el Club de Neurociencia de UCB presenta su Symposium de Proyectos: talleres, exhibiciones, disecciones y un hackathon enfocado en neurotecnología.",
        image: neuroxplore_banner_sqd,
        buttonText: "Más información",
        onButtonClick: () => {
            window.location.href = `/events/1`;
        },
        details: {
            completeTitle: "Symposium de Proyectos 2025 - Club de Neurociencia UCB",
            image: neuroxplore_banner_wide,
            startDate: "28 de abril; 9:00 a.m. (GMT-4)",
            endDate: "10 de mayo; 1:00 p.m. (GMT-4)",
            formatedStartDate: "2025-04-28T09:00:00-04:00",
            description: "Un encuentro universitario que reúne los proyectos de estudiantes en neurotecnología: desde talleres en línea y exhibiciones hasta disecciones prácticas y un hackathon de 48 horas.",
            about: "Organizado por el Club de Neurociencia UCB, este evento potencia habilidades técnicas y de investigación en neurociencia aplicada. Fomenta la colaboración multidisciplinaria y la creación de soluciones reales en salud y educación.",
            location: "UCB La Paz — Av. 14 de Septiembre N° 4807",
            locationMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1671.4825846391861!2d-68.11042608241759!3d-16.52208641711459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f20ee187a3103%3A0x2f2bb2b7df32a24d!2sUniversidad%20Cat%C3%B3lica%20Boliviana%20%22San%20Pablo%22!5e0!3m2!1ses-419!2sbo!4v1743635547336!5m2!1ses-419!2sbo",
            when: "28 de abril – 10 de mayo, 2025 (GMT-4)",
        }
    },
    {
        id: 2,
        title: "EEG Workshop",
        description:
            "Del 28 de abril al 2 de mayo, participa en un taller virtual de registro y análisis de señales EEG para proyectos de investigación en neurociencia.",
        image: bootcamp_sqd,
        buttonText: "Más información",
        onButtonClick: () => {
            window.location.href = `/events/2`;
        },
        details: {
            completeTitle: "Taller Virtual de EEG y Señales Neuronales",
            image: bootcamp_wide,
            startDate: "28 de abril; 9:00 a.m. (GMT-4)",
            endDate: "2 de mayo; 6:00 p.m. (GMT-4)",
            formatedStartDate: "2025-04-28T09:00:00-04:00",
            description: "Serie de sesiones en línea para aprender montaje de EEG, procesamiento de señales y extracción de características para proyectos neurocientíficos.",
            about: "Dirigido a estudiantes y miembros del club, este workshop cubre fundamentos teóricos y prácticas guiadas con datos reales, preparando al equipo para sus proyectos de campo.",
            location: "En línea",
            locationMap: "",
            when: "28 de abril – 2 de mayo, 2025 (GMT-4)",
        }
    },
    {
        id: 3,
        title: "Research Showcase",
        description:
            "El 5 de mayo, el Club de Neurociencia exhibirá más de 15 proyectos de estudiantes en una feria de investigación en el Ágora de UCB.",
        image: feria_sqd,
        buttonText: "Más información",
        onButtonClick: () => {
            window.location.href = `/events/3`;
        },
        details: {
            completeTitle: "Feria de Proyectos NeurotechUCB",
            image: feria_wide,
            startDate: "5 de mayo; 9:00 a.m. (GMT-4)",
            endDate: "5 de mayo; 4:00 p.m. (GMT-4)",
            formatedStartDate: "2025-05-05T09:00:00-04:00",
            description: "Exhibición abierta donde los miembros del club presentan sus desarrollos en neurociencia: interfaces, dispositivos y software de análisis.",
            about: "Un espacio para compartir avances, recibir feedback y conectar con otros aficionados a la neurotecnología dentro de la comunidad universitaria.",
            location: "Ágora – UCB La Paz",
            locationMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1671.4825846391861!2d-68.11042608241759!3d-16.52208641711459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f20ee187a3103%3A0x2f2bb2b7df32a24d!2sUniversidad%20Cat%C3%B3lica%20Boliviana%20%22San%20Pablo%22!5e0!3m2!1ses-419!2sbo!4v1743635547336!5m2!1ses-419!2sbo",
            when: "5 de mayo, 2025 (GMT-4)",
        }
    },
    {
        id: 4,
        title: "Neuron Dissection Workshop",
        description:
            "El 6 de mayo, aprende técnicas de disección y anatomía neuronales en el laboratorio de Ingeniería Biomédica.",
        image: diseccion_sqd,
        buttonText: "Más información",
        onButtonClick: () => {
            window.location.href = `/events/4`;
        },
        details: {
            completeTitle: "Taller Práctico de Disección Neuronal",
            image: diseccion_wide,
            startDate: "6 de mayo; 10:00 a.m. (GMT-4)",
            endDate: "6 de mayo; 12:00 p.m. (GMT-4)",
            formatedStartDate: "2025-05-06T10:00:00-04:00",
            description: "Sesión presencial para explorar la estructura del cerebro usando muestras y protocolos de neuroanatomía.",
            about: "Guiado por expertos del club, este taller brinda experiencia directa en el manejo de tejidos y modelos anatómicos para futuros proyectos de investigación.",
            location: "Laboratorio de Ingeniería Biomédica – UCB",
            locationMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1671.4825846391861!2d-68.11042608241759!3d-16.52208641711459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f20ee187a3103%3A0x2f2bb2b7df32a24d!2sUniversidad%20Cat%C3%B3lica%20Boliviana%20%22San%20Pablo%22!5e0!3m2!1ses-419!2sbo!4v1743635547336!5m2!1ses-419!2sbo",
            when: "6 de mayo, 2025 (GMT-4)",
        }
    },
    {
        id: 5,
        title: "Neuroinformatics Hackathon",
        description:
            "Del 8 al 10 de mayo, equipos multidisciplinarios desarrollarán soluciones de software para proyectos de neurociencia en 48 horas.",
        image: hackathon_sqd,
        buttonText: "Más información",
        onButtonClick: () => {
            window.location.href = `/events/5`;
        },
        details: {
            completeTitle: "Hackathon de Neuroinformática 2025",
            image: hackathon_wide,
            startDate: "8 de mayo; 4:00 p.m. (GMT-4)",
            endDate: "10 de mayo; 1:00 p.m. (GMT-4)",
            formatedStartDate: "2025-05-08T16:00:00-04:00",
            description: "Competencia de 48 horas donde los participantes diseñan y prototipan herramientas de análisis de datos neuronales.",
            about: "Es el punto culminante del Symposium: fomenta la creatividad, colaboración y aplicación de algoritmos para resolver retos reales de neurociencia.",
            location: "Planta baja – Bloque C, UCB La Paz",
            locationMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1671.4825846391861!2d-68.11042608241759!3d-16.52208641711459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f20ee187a3103%3A0x2f2bb2b7df32a24d!2sUniversidad%20Cat%C3%B3lica%20Boliviana%20%22San%20Pablo%22!5e0!3m2!1ses-419!2sbo!4v1743635547336!5m2!1ses-419!2sbo",
            when: "8 – 10 de mayo, 2025 (GMT-4)",
        }
    }
];
