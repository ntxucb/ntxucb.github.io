import { TaskBar } from "./Components/TaskBar";
import Footer from "./Components/Footer";
import "./WebPage.css";

export const WebPage = () => {
  return (
    <>
      <TaskBar />
      <div className="background">
        <h1 className="welcome-text">WELCOME</h1>
      </div>
      <Footer />
    </>
  );
};
