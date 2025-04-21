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
import EventDetails from './pages/EventDetails/EventDetails';
import NotFound from './pages/NotFound/NotFound';

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
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/our_team" element={<Our_Team />} />
          <Route path="/podcast" element={<Podcast />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="*" element={<NotFound />} />
        </>
      )}
    </Routes>
  );
}

function App() {
  const base = import.meta.env.VITE_PUBLIC_BASE_PATH || '/';

  return (
    <BrowserRouter basename={base}>
      <TaskBar />
      <AppRoutes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
