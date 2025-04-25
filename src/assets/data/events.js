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
            "NEUROXPLORE, organized by Neurotech UCB, is an event taking place from April 28 to May 10 that promotes innovation in neurotechnology through a Virtual Bootcamp, a Project Fair, a Brain Dissection, and a Hackathon. It is aimed at students, educators, and professionals in neuroscience, biomedical engineering, and artificial intelligence.",
        image: neuroxplore_banner_sqd,
        buttonText: "More info",
        onButtonClick: () => {
            window.location.href = `/events/1`;
        },
        details: {
            completeTitle: "NEUROXPLORE 2025 - Neurotechnology and Innovation Gathering",
            image: neuroxplore_banner_wide,
            startDate: "April 28; 9:00a.m. (GMT-4)",
            endDate: "May 10; 1:00p.m. (GMT-4)",
            formatedStartDate: "2025-04-28T09:00:00-04:00",
            description: "NEUROXPLORE is a unique university experience that merges training, science, and creativity around neurotechnology. Over nearly two weeks, students and professionals will take part in activities such as a virtual bootcamp, a project fair, a hands-on brain dissection, and a 48-hour hackathon. Led by the Neurotech UCB club, the event aims to boost the development of tech solutions applied to neuroscience in a collaborative setting.",
            about: "Organized by Neurotech UCB, NEUROXPLORE is designed to foster technical, research, and creative skills in neuroscience and emerging technologies. Through both theoretical and hands-on activities, it promotes multidisciplinary collaboration, scientific outreach, and the development of real-world projects with impact. The event not only strengthens academic training but also connects students with an active community of innovation and brain-centered technology.",
            location: "UCB La Paz -- Av. 14 de Septiembre N° 4807",
            locationMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1671.4825846391861!2d-68.11042608241759!3d-16.52208641711459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f20ee187a3103%3A0x2f2bb2b7df32a24d!2sUniversidad%20Cat%C3%B3lica%20Boliviana%20%22San%20Pablo%22!5e0!3m2!1ses-419!2sbo!4v1743635547336!5m2!1ses-419!2sbo",
            when: "April 28 - May 10, 2025 -- (GMT-4)",
        }
    },
    {
        id: 2,
        title: "Virtual Bootcamp",
        description:
            "From April 28 to May 2, the Virtual Bootcamp will provide training in neuroscience, brain-computer interfaces, and brain signal analysis.",
        image: bootcamp_sqd,
        buttonText: "More info",
        onButtonClick: () => {
            window.location.href = `/events/2`;
        },
        details: {
            completeTitle: "Neuroxplore Virtual Bootcamp",
            image: bootcamp_wide,
            startDate: "April 28; 2:00p.m. (GMT-4)",
            endDate: "May 2; 9:00p.m. (GMT-4)",
            formatedStartDate: "2025-04-28T14:00:00-04:00",
            description: "An intensive week of online training in neuroscience, BCI (Brain-Computer Interfaces), and brain signal processing. Taught by experts and tailored for those looking to enter the neurotechnology field.",
            about: "This bootcamp is the gateway to the world of neurotechnology. The virtual sessions will provide theoretical foundations, practical tools, and real-life use cases, preparing participants for the challenges of the upcoming events.",
            location: "Online",
            locationMap: "",
            when: "April 28 - May 2, 2025 -- (GMT-4)",
            registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLScHKi_kJHi7wen2WBFMbbd1yj5EB27z2C9nVjPxj_ML_OSh8w/viewform",
            moreInfoLink: "https://www.canva.com/design/DAGlePRAYuE/TLI8x51F_VJ2t553mlPr4w/edit?utm_content=DAGlePRAYuE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
        }
    },
    {
        id: 3,
        title: "Project Fair",
        description:
            "On May 5, the Project Fair will showcase student talent through over 15 tech developments in neuroscience.",
        image: feria_sqd,
        buttonText: "More info",
        onButtonClick: () => {
            window.location.href = `/events/3`;
        },
        details: {
            completeTitle: "Neuroxplore Project Fair",
            image: feria_wide,
            startDate: "May 5; 9:00a.m. (GMT-4)",
            endDate: "May 5; 3:00p.m. (GMT-4)",
            formatedStartDate: "2025-05-05T09:00:00-04:00",
            description: "An open exhibition at UCB's Ágora where students from Neurotech UCB and UMSA will present innovative projects developed as part of the event.",
            about: "The Project Fair is the space where ideas come to life. It seeks to foster creativity, scientific outreach, and knowledge exchange between clubs and visitors.",
            location: "Ágora - UCB La Paz",
            locationMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1671.4825846391861!2d-68.11042608241759!3d-16.52208641711459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f20ee187a3103%3A0x2f2bb2b7df32a24d!2sUniversidad%20Cat%C3%B3lica%20Boliviana%20%22San%20Pablo%22!5e0!3m2!1ses-419!2sbo!4v1743635547336!5m2!1ses-419!2sbo",
            when: "May 5, 2025 -- (GMT-4)",
        }
    },
    {
        id: 4,
        title: "Brain Dissection",
        description:
            "On May 6, a hands-on experience in brain anatomy will take place at the Biomedical Engineering Laboratory.",
        image: diseccion_sqd,
        buttonText: "More info",
        onButtonClick: () => {
            window.location.href = `/events/4`;
        },
        details: {
            completeTitle: "Applied Brain Dissection for Neuroscience",
            image: diseccion_wide,
            startDate: "May 6; 10:00a.m. (GMT-4)",
            endDate: "May 6; 12:00p.m. (GMT-4)",
            formatedStartDate: "2025-05-06T10:00:00-04:00",
            description: "A practical and interactive session that allows direct exploration of brain anatomy under the guidance of neuroscience experts.",
            about: "This activity offers a unique educational experience for students interested in understanding brain structure through real anatomical techniques.",
            location: "Biomedical Engineering Lab - UCB",
            locationMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1671.4825846391861!2d-68.11042608241759!3d-16.52208641711459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f20ee187a3103%3A0x2f2bb2b7df32a24d!2sUniversidad%20Cat%C3%B3lica%20Boliviana%20%22San%20Pablo%22!5e0!3m2!1ses-419!2sbo!4v1743635547336!5m2!1ses-419!2sbo",
            when: "May 6, 2025 -- (GMT-4)",
        }
    },
    {
        id: 6,
        title: "Brain Dissection second session",
        description:
            "On May 6, a hands-on experience in brain anatomy will take place at the Biomedical Engineering Laboratory.",
        image: diseccion_sqd,
        buttonText: "More info",
        onButtonClick: () => {
            window.location.href = `/events/4`;
        },
        details: {
            completeTitle: "Applied Brain Dissection for Neuroscience (second session)",
            image: diseccion_wide,
            startDate: "May 6; 3:00p.m. (GMT-4)",
            endDate: "May 6; 5:00p.m. (GMT-4)",
            formatedStartDate: "2025-05-06T15:00:00-04:00",
            description: "A practical and interactive session that allows direct exploration of brain anatomy under the guidance of neuroscience experts.",
            about: "This activity offers a unique educational experience for students interested in understanding brain structure through real anatomical techniques.",
            location: "Biomedical Engineering Lab - UCB",
            locationMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1671.4825846391861!2d-68.11042608241759!3d-16.52208641711459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f20ee187a3103%3A0x2f2bb2b7df32a24d!2sUniversidad%20Cat%C3%B3lica%20Boliviana%20%22San%20Pablo%22!5e0!3m2!1ses-419!2sbo!4v1743635547336!5m2!1ses-419!2sbo",
            when: "May 6, 2025 -- (GMT-4)",
        }
    },
    {
        id: 5,
        title: "Neurotechnology Hackathon",
        description:
            "From May 8 to 10, multidisciplinary teams will develop technological solutions applied to neuroscience in a 48-hour competition.",
        image: hackathon_sqd,
        buttonText: "More info",
        onButtonClick: () => {
            window.location.href = `/events/5`;
        },
        details: {
            completeTitle: "Neurotechnology Hackathon - NEUROXPLORE 2025",
            image: hackathon_wide,
            startDate: "May 8; 10:00a.m. (GMT-4)",
            endDate: "May 10; 5:00p.m. (GMT-4)",
            formatedStartDate: "2025-05-08T10:00:00-04:00",
            description: "An intensive innovation competition where participants design and prototype tech solutions focused on neurotechnology. Open to student and professional teams.",
            about: "The hackathon is the highlight of NEUROXPLORE. It fosters creativity, collaborative work, and the real-world application of technical knowledge to solve real challenges.",
            location: "Ground floor - Block C, UCB La Paz",
            locationMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1671.4825846391861!2d-68.11042608241759!3d-16.52208641711459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f20ee187a3103%3A0x2f2bb2b7df32a24d!2sUniversidad%20Cat%C3%B3lica%20Boliviana%20%22San%20Pablo%22!5e0!3m2!1ses-419!2sbo!4v1743635547336!5m2!1ses-419!2sbo",
            when: "May 8 - 10, 2025 -- (GMT-4)",
            registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSevlzNuLcfxxUjej-jSGVJSNd7x34bqLTdECDWCnGbdfjcg0g/viewform",
            moreInfoLink: "https://www.canva.com/design/DAGlevDxy48/192O-wNzmjo7CxK9Euzytg/edit",
        }
    }
];