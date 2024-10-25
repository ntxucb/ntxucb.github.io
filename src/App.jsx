import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./routes/Home";
import { Events } from "./routes/Events";
import { Our_Team } from "./routes/Our_Team";
import { Podcast } from "./routes/Podcast";
import { Projects } from "./routes/Projects";
import { WebPage } from "./routes/WebPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/ntxucblapaz.github.io/" element={<WebPage />} />
          <Route path="/ntxucblapaz.github.io/home" element={<Home />} />
          <Route path="/ntxucblapaz.github.io/events" element={<Events />} />
          <Route path="/ntxucblapaz.github.io/our_team" element={<Our_Team />} />
          <Route path="/ntxucblapaz.github.io/podcast" element={<Podcast />} />
          <Route path="/ntxucblapaz.github.io/projects" element={<Projects />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
