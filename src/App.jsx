import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Events } from "./pages/Events/Events";
import { Our_Team } from "./pages/Our_Team/Our_Team";
import { Podcast } from "./pages/Podcast/Podcast";
import { Projects } from "./pages/Projects/Projects";
import config from "./config.json"
import UnderConstruction from "./pages/UnderConstruction/UnderConstruction";
import { TaskBar } from "./components/layout/TaskBar/TaskBar";
import Footer from "./components/layout/Footer/Footer";
import HomePage from './pages/Home/Home';

function AppRoutes() {
  const location = useLocation();
  const isProduction = import.meta.env.VITE_ENV === "production";
  const isUnderConstruction = isProduction && config.pagesUnderConstruction.includes(location.pathname);

  return (
    <Routes>
      {isUnderConstruction ? (
        <Route path={location.pathname} element={<UnderConstruction />} />
      ) : (
        <>
          <Route path="/ntxucblapaz.github.io/" element={<HomePage />} />
          <Route path="/ntxucblapaz.github.io/events" element={<Events />} />
          <Route path="/ntxucblapaz.github.io/our_team" element={<Our_Team />} />
          <Route path="/ntxucblapaz.github.io/podcast" element={<Podcast />} />
          <Route path="/ntxucblapaz.github.io/projects" element={<Projects />} />
        </>
      )}
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <TaskBar />
      <AppRoutes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
