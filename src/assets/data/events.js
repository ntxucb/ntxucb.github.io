import baw2026_logo from "../images/neuroxplore/events/baw2026/baw2026.jpeg"
import cronograma from "../images/neuroxplore/events/baw2026/cronograma.jpeg"
import neurocinema from "../images/neuroxplore/events/baw2026/neurocinema.jpeg"
import neurofest from "../images/neuroxplore/events/baw2026/neurofest.jpeg"
import neuroforum from "../images/neuroxplore/events/baw2026/neuroforum.jpeg"
import squared_placeholder from "../images/placeholder-cuadrado.jpg";
import wide_placeholder from "../images/wide_placeholder.webp"

export const eventsData = [
    {
        id: 1,
        title: "BAW NeuroXperience 2026",
        isOutstanding: true,
        description:
            "Brain Awareness Week (BAW) is the global campaign to foster public enthusiasm and support for brain science. Join us from April 14 to 24 for a series of interactive events, talks, and a project fair.",
        image: baw2026_logo,
        buttonText: "More info",
        onButtonClick: () => {
            window.location.href = `/events/1`;
        },
        details: {
            completeTitle: "BAW NeuroXperience 2026 - Brain Awareness Week",
            image: cronograma,
            startDate: "April 14; 2:00p.m. (GMT-4)",
            endDate: "April 24; 6:00p.m. (GMT-4)",
            formatedStartDate: "2026-04-14T14:00:00-04:00",
            description: "BAW NeuroXperience 2026 is a week-long celebration of neuroscience organized by Neurotech UCB. The event features a variety of activities designed to engage the community and promote the wonders of the brain.",
            about: "Through activities like NeuroForum, NeuroCinema, and NeuroFest, we aim to bridge the gap between science and the general public, showcasing the latest developments in neurotechnology and brain research.",
            location: "UCB La Paz -- Av. 14 de Septiembre N° 4807",
            locationMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1671.4825846391861!2d-68.11042608241759!3d-16.52208641711459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f20ee187a3103%3A0x2f2bb2b7df32a24d!2sUniversidad%20Cat%C3%B3lica%20Boliviana%20%22San%20Pablo%22!5e0!3m2!1ses-419!2sbo!4v1743635547336!5m2!1ses-419!2sbo",
            when: "April 14 - 24, 2026 -- (GMT-4)",
        }
    },
    {
        id: 2,
        title: "NeuroForum",
        description:
            "From April 14 to 16, join the Journal Club to discuss and analyze scientific papers in neuroscience and psychology.",
        image: neuroforum,
        buttonText: "More info",
        onButtonClick: () => {
            window.location.href = `/events/2`;
        },
        details: {
            completeTitle: "NeuroForum - Journal Club",
            image: neuroforum,
            startDate: "April 14; 2:00p.m. (GMT-4)",
            endDate: "April 16; 4:00p.m. (GMT-4)",
            formatedStartDate: "2026-04-14T14:00:00-04:00",
            description: "An academic space for students and professionals to dive deep into neuroscience literature, sharing insights and critical analysis of recent papers.",
            about: "This event focuses on the Journal Club format, where participants present and discuss research findings in the field of neuroscience and psychology.",
            location: "Biblioteca - Piso 3, UCB",
            locationMap: "",
            when: "April 14 - 16, 2026 -- (GMT-4)",
        }
    },
    {
        id: 3,
        title: "NeuroCinema",
        description:
            "On April 17, experience the intersection of cinema and neuroscience with screenings and discussions of iconic films.",
        image: neurocinema,
        buttonText: "More info",
        onButtonClick: () => {
            window.location.href = `/events/3`;
        },
        details: {
            completeTitle: "NeuroCinema - Cine y Neurociencia",
            image: neurocinema,
            startDate: "April 17; 9:30a.m. (GMT-4)",
            endDate: "April 17; 9:30p.m. (GMT-4)",
            formatedStartDate: "2026-04-17T09:30:00-04:00",
            description: "Immerse yourself in a free, unique experience where cinema and neuroscience meet. Featuring screenings of 'Lucy' and 'Eternal Sunshine of the Spotless Mind'.",
            about: "Open to the general public, this event uses the power of film to explore complex brain concepts and stimulate discussion about the mind.",
            location: "Auditorio Principal - Bloque G, UCB",
            locationMap: "",
            when: "April 17, 2026 -- (GMT-4)",
        }
    },
    {
        id: 4,
        title: "NeuroFest",
        description:
            "On April 22, the project fair will showcase university projects in neuroscience, technology, and medicine.",
        image: neurofest,
        buttonText: "More info",
        onButtonClick: () => {
            window.location.href = `/events/4`;
        },
        details: {
            completeTitle: "NeuroFest - Feria de Proyectos",
            image: neurofest,
            startDate: "April 22; 10:00a.m. (GMT-4)",
            endDate: "April 22; 4:00p.m. (GMT-4)",
            formatedStartDate: "2026-04-22T10:00:00-04:00",
            description: "A large exhibition where students present their innovative projects and initiatives to the community.",
            about: "NeuroFest is a space for sharing academic and technological proposals, fostering collaboration and interest in neurotech.",
            location: "Ágora - UCB",
            locationMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1671.4825846391861!2d-68.11042608241759!3d-16.52208641711459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f20ee187a3103%3A0x2f2bb2b7df32a24d!2sUniversidad%20Cat%C3%B3lica%20Boliviana%20%22San%20Pablo%22!5e0!3m2!1ses-419!2sbo!4v1743635547336!5m2!1ses-419!2sbo",
            when: "April 22, 2026 -- (GMT-4)",
        }
    },
    {
        id: 5,
        title: "NeuroTalks",
        description:
            "From April 23 to 24, attend virtual talks with specialist speakers sharing their expertise in various neuroscience areas.",
        image: cronograma,
        buttonText: "More info",
        onButtonClick: () => {
            window.location.href = `/events/5`;
        },
        details: {
            completeTitle: "NeuroTalks - Virtual Series",
            image: wide_placeholder,
            startDate: "April 23; 9:00a.m. (GMT-4)",
            endDate: "April 24; 6:00p.m. (GMT-4)",
            formatedStartDate: "2026-04-23T09:00:00-04:00",
            description: "A series of online talks featuring experts in neuroscience, technology, and clinical applications.",
            about: "NeuroTalks provides a platform for global knowledge exchange, allowing participants to learn from leaders in the field from the comfort of their homes.",
            location: "Virtual",
            locationMap: "",
            when: "April 23 - 24, 2026 -- (GMT-4)",
        }
    }
];