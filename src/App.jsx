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
          <Route path="/" element={<WebPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/our_team" element={<Our_Team />} />
          <Route path="/podcast" element={<Podcast />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
