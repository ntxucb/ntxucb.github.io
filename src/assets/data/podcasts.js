import SpotifyIcon from "../icons/Spotify.png";
import YoutubePodcastIcon from "../icons/Youtube.png";
import Img1 from "../images/Podcast1.png";
import Img2 from "../images/Podcast2.png";

export const podcastData = [
  {
    title: "Podcast 1: EL OTRO LADO DEL CEREBRO",
    description:
      "Es un podcast que cuenta con la participación de distintos especialistas en psicología y neurociencia, cuyo objetivo es explorar las profundidades de la mente humana. Producido por: Neurotransmitiendo",
    imgSrc: Img1,
    links: [
      {
        img: SpotifyIcon,
        url: "https://open.spotify.com/show/5vrxvfOgGfl7B9QDYn5tJw?si=Vj6bfcfjT0CcDkhjlTjW0Q&nd=1&dlsi=09b4a828763a4936",
      },
    ],
  },
  {
    title: "Podcast 2: MI ÚLTIMA NEURONA",
    description:
      "Es un podcast cuyo objetivo es otorgar información sobre neurociencia de forma gratuita, al mismo tiempo busca inspirar a una nueva generación de científicos hispanos. Productora: Jessica Chomik-Morales",
    imgSrc: Img2,
    links: [
      {
        img: SpotifyIcon,
        url: "https://open.spotify.com/show/4tif9z6zO0vtGM94sjQNqg?si=bnIJoIrZRo2sOoA1Y9f2Zg&nd=1&dlsi=a6ad16904f3947bd",
      },
      {
        img: YoutubePodcastIcon,
        url: "https://youtube.com/@miultimaneurona?si=gwCbL3qQhYur4sQj",
      },
    ],
  },
];