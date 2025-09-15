import squared_placeholder from "../images/placeholder-cuadrado.jpg";

const img = squared_placeholder;

export const projectsData = [
  {
    id: 101,
    title:
      "Deep Learning for Affective State Recognition during Gameplay on GAMEEMO Dataset",
    shortDescription: "Descripción corta del proyecto",
    date: "19/02/2025",
    status: "ongoing", 
    image: img,
    technologies: ["Deep Learning", "EEG", "Signal Processing"],
    members: ["Manuel Illanes", "Andres Aracena", "Eric Roth"],
    buttonText: "More info",
  },
  {
    id: 102,
    title:
      "Cognitive Workload Estimation with Lightweight Models on Wearables",
    shortDescription: "Estimación de carga cognitiva con sensores de bajo costo.",
    date: "03/02/2025",
    status: "ongoing",
    image: img,
    technologies: ["TinyML", "Wearables", "ML"],
    members: ["María López", "Juan Pérez"],
    buttonText: "More info",
  },
  {
    id: 103,
    title: "Neurofeedback for Attention Training in Students",
    shortDescription:
      "Protocolo de neurofeedback para mejorar atención sostenida.",
    date: "12/12/2024",
    status: "ongoing",
    image: img,
    technologies: ["Neurofeedback", "BCI", "EEG"],
    members: ["Sofía R.", "Carlos M."],
    buttonText: "More info",
  },
  {
    id: 201,
    title:
      "HACKATHON NTX LA PAZ 2024 — Brain-Computer Interfaces Challenge",
    shortDescription:
      "La primera HACKATHON de Neurotecnología en Bolivia.",
    date: "28/09/2024",
    status: "completed",
    image: img,
    technologies: ["Hackathon", "BCI", "Prototyping"],
    members: ["Equipo NTX", "Mentores IBRO"],
    buttonText: "More info",
  },
  {
    id: 202,
    title: "Affective Computing with Multimodal Signals",
    shortDescription:
      "Modelos de fusión de señales para estimar estados afectivos.",
    date: "10/08/2024",
    status: "completed",
    image: img,
    technologies: ["Affective Computing", "Multimodal", "ML"],
    members: ["Ana T.", "Luis F."],
    buttonText: "More info",
  },
  {
    id: 203,
    title: "TinyML ECG Arrhythmia Screening",
    shortDescription:
      "Clasificador embebido para tamizaje de arritmias.",
    date: "20/06/2024",
    status: "completed",
    image: img,
    technologies: ["TinyML", "ECG", "Healthcare"],
    members: ["Juan Pérez", "María López"],
    buttonText: "More info",
  },
  {
    id: 204,
    title: "Open EEG Toolkit for Student Labs",
    shortDescription:
      "Kit de laboratorio abierto para prácticas con EEG.",
    date: "11/05/2024",
    status: "completed",
    image: img,
    technologies: ["Education", "EEG", "Hardware"],
    members: ["Andres Aracena", "Equipo NTX"],
    buttonText: "More info",
  },
  {
    id: 205,
    title: "Neuroscience Outreach Program for High Schools",
    shortDescription:
      "Programa de divulgación y talleres prácticos.",
    date: "22/04/2024",
    status: "completed",
    image: img,
    technologies: ["Outreach", "Education"],
    members: ["Voluntariado NTX"],
    buttonText: "More info",
  },
];

// Utilidades para opciones de filtros
export const technologyOptions = Array.from(
  new Set(projectsData.flatMap((p) => p.technologies))
).sort();

export const memberOptions = Array.from(
  new Set(projectsData.flatMap((p) => p.members))
).sort();
