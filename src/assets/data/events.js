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

export const eventsData = [
    {
        id: 1,
        title: "NEUROXPLORE",
        isOutstanding: true,
        description:
            "NEUROXPLORE, organizado por Neurotech UCB, es un evento del 28 de abril al 10 de mayo que promueve la innovación en neurotecnología mediante un Bootcamp Virtual, una Feria de Proyectos, una Disección Cerebral y una Hackathon, dirigido a estudiantes, docentes y profesionales de neurociencia, ingeniería biomédica e inteligencia artificial.",
        image: neuroxplore_banner_sqd,
        buttonText: "Más información",
        onButtonClick: () => {
            window.location.href = `/ntxucblapaz.github.io/events/1`;
        },
        details: {
            completeTitle: "NEUROXPLORE 2025 - Encuentro de Neurotecnología e innovación",
            image: neuroxplore_banner_wide,
            startDate: "28 abril; 9:00a.m. (GMT-4)",
            endDate: "10 mayo; 1:00p.m. (GMT-4)",
            formatedStartDate: "2025-04-28T09:00:00-04:00",
            description: "NEUROXPLORE es una experiencia universitaria única que fusiona formación, ciencia y creatividad en torno a la neurotecnología. Durante casi dos semanas, estudiantes y profesionales participarán en actividades como un bootcamp virtual, una feria de proyectos, una disección cerebral práctica y una hackathon de 48 horas. El evento, liderado por el club Neurotech UCB, busca impulsar el desarrollo de soluciones tecnológicas aplicadas a la neurociencia en un entorno colaborativo.",
            about: "Organizado por Neurotech UCB, NEUROXPLORE está diseñado para fomentar habilidades técnicas, investigativas y creativas en neurociencia y tecnologías emergentes. A través de actividades teóricas y prácticas, se promueve la colaboración multidisciplinaria, la divulgación científica y el desarrollo de proyectos reales con impacto. Este evento no solo fortalece la formación académica, sino que también conecta a estudiantes con una comunidad activa en innovación y tecnología aplicada al cerebro.",
            location: "UCB La Paz -- Av. 14 de Septiembre N° 4807",
            locationMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1671.4825846391861!2d-68.11042608241759!3d-16.52208641711459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f20ee187a3103%3A0x2f2bb2b7df32a24d!2sUniversidad%20Cat%C3%B3lica%20Boliviana%20%22San%20Pablo%22!5e0!3m2!1ses-419!2sbo!4v1743635547336!5m2!1ses-419!2sbo",
            when: "28 abril - 10 mayo 2025 -- (GMT-4)",
            organizers: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41],
        }
    },
    {
        id: 2,
        title: "Bootcamp Virtual",
        description:
            "Del 28 de abril al 2 de mayo, el Bootcamp Virtual ofrecerá formación en neurociencia, interfaces cerebro-computadora y análisis de señales cerebrales.",
        image: bootcamp_sqd,
        buttonText: "Más información",
        onButtonClick: () => {
            window.location.href = `/ntxucblapaz.github.io/events/2`;
        },
        details: {
            completeTitle: "Bootcamp Virtual Neuroxplore",
            image: bootcamp_wide,
            startDate: "28 abril; 9:00a.m. (GMT-4)",
            endDate: "2 mayo; 6:00p.m. (GMT-4)",
            formatedStartDate: "2025-04-28T09:00:00-04:00",
            description: "Una semana de formación intensiva online en neurociencia, BCI (Brain-Computer Interfaces) y procesamiento de señales cerebrales. Dictado por expertos y pensado para quienes desean introducirse en el campo de la neurotecnología.",
            about: "Este bootcamp es la puerta de entrada al mundo de la neurotecnología. Las sesiones virtuales brindarán fundamentos teóricos, herramientas prácticas y casos de uso reales, preparando a los participantes para los retos de los siguientes eventos.",
            location: "Modalidad Virtual",
            locationMap: "",
            when: "28 abril - 2 mayo 2025 -- (GMT-4)",
            organizers: [1, 2, 3, 4],
        }
    },
    {
        id: 3,
        title: "Feria de Proyectos",
        description:
            "El 5 de mayo, la Feria de Proyectos mostrará el talento de estudiantes con más de 15 desarrollos tecnológicos en neurociencia.",
        image: feria_sqd,
        buttonText: "Más información",
        onButtonClick: () => {
            window.location.href = `/ntxucblapaz.github.io/events/3`;
        },
        details: {
            completeTitle: "Feria de Proyectos Neuroxplore",
            image: feria_wide,
            startDate: "5 mayo; 9:00a.m. (GMT-4)",
            endDate: "5 mayo; 4:00p.m. (GMT-4)",
            formatedStartDate: "2025-05-05T09:00:00-04:00",
            description: "Una exposición abierta en el Ágora de la UCB donde estudiantes de Neurotech UCB y UMSA presentarán proyectos innovadores desarrollados en el marco del evento.",
            about: "La Feria de Proyectos es el espacio donde las ideas se hacen visibles. Se busca incentivar la creatividad, la divulgación científica y el intercambio entre clubes y asistentes.",
            location: "Ágora - UCB La Paz",
            locationMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1671.4825846391861!2d-68.11042608241759!3d-16.52208641711459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f20ee187a3103%3A0x2f2bb2b7df32a24d!2sUniversidad%20Cat%C3%B3lica%20Boliviana%20%22San%20Pablo%22!5e0!3m2!1ses-419!2sbo!4v1743635547336!5m2!1ses-419!2sbo",
            when: "5 mayo 2025 -- (GMT-4)",
            organizers: [14, 15, 16, 17],
        }
    },
    {
        id: 4,
        title: "Disección Cerebral",
        description:
            "El 6 de mayo se llevará a cabo una experiencia práctica en anatomía cerebral en el Laboratorio de Ingeniería Biomédica.",
        image: diseccion_sqd,
        buttonText: "Más información",
        onButtonClick: () => {
            window.location.href = `/ntxucblapaz.github.io/events/4`;
        },
        details: {
            completeTitle: "Disección Cerebral Aplicada a la Neurociencia",
            image: diseccion_wide,
            startDate: "6 mayo; 10:00a.m. (GMT-4)",
            endDate: "6 mayo; 12:00p.m. (GMT-4)",
            formatedStartDate: "2025-05-06T10:00:00-04:00",
            description: "Una sesión práctica e interactiva que permitirá explorar la anatomía cerebral de forma directa, bajo la supervisión de expertos en neurociencia.",
            about: "Esta actividad proporciona una experiencia educativa única para estudiantes interesados en comprender la estructura del cerebro a través de técnicas anatómicas reales.",
            location: "Laboratorio de Ingeniería Biomédica - UCB",
            locationMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1671.4825846391861!2d-68.11042608241759!3d-16.52208641711459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f20ee187a3103%3A0x2f2bb2b7df32a24d!2sUniversidad%20Cat%C3%B3lica%20Boliviana%20%22San%20Pablo%22!5e0!3m2!1ses-419!2sbo!4v1743635547336!5m2!1ses-419!2sbo",
            when: "6 mayo 2025 -- (GMT-4)",
            organizers: [9, 10, 11, 12, 13],
        }
    },
    {
        id: 5,
        title: "Hackathon de Neurotecnología",
        description:
            "Del 8 al 10 de mayo, equipos multidisciplinarios desarrollarán soluciones tecnológicas aplicadas a la neurociencia en una competencia de 48 horas.",
        image: hackathon_sqd,
        buttonText: "Más información",
        onButtonClick: () => {
            window.location.href = `/ntxucblapaz.github.io/events/5`;
        },
        details: {
            completeTitle: "Hackathon de Neurotecnología - NEUROXPLORE 2025",
            image: hackathon_wide,
            startDate: "8 mayo; 4:00p.m. (GMT-4)",
            endDate: "10 mayo; 1:00p.m. (GMT-4)",
            formatedStartDate: "2025-05-08T16:00:00-04:00",
            description: "Competencia intensiva de innovación donde se diseñan y prototipan soluciones tecnológicas centradas en la neurotecnología. Participan equipos de estudiantes y profesionales.",
            about: "La hackathon es el evento cumbre de NEUROXPLORE. Fomenta la creatividad, el trabajo colaborativo y la aplicación real de conocimientos técnicos en desafíos del mundo real.",
            location: "Planta baja - Bloque C, UCB La Paz",
            locationMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1671.4825846391861!2d-68.11042608241759!3d-16.52208641711459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f20ee187a3103%3A0x2f2bb2b7df32a24d!2sUniversidad%20Cat%C3%B3lica%20Boliviana%20%22San%20Pablo%22!5e0!3m2!1ses-419!2sbo!4v1743635547336!5m2!1ses-419!2sbo",
            when: "8 - 10 mayo 2025 -- (GMT-4)",
            organizers: [18, 19, 20, 21, 22, 23],
        }
    }
];