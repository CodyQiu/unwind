import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Journal from "./components/Journal";
import Breathing from "./components/Breathing";
import Checklist from "./components/Checklist";

function App() {
  const [activeView, setActiveView] = useState("home");
  let page;
  if (activeView === "home") {
    page = <Home />;
  } else if (activeView === "journal") {
    page = <Journal />;
  } else if (activeView === "breathing") {
    page = <Breathing />;
  } else if (activeView === "checklist") {
    page = <Checklist />;
  }

  return (
    <div>
      <Header />
      <nav>
        <button onClick={() => setActiveView("home")}>Home</button>
        <button onClick={() => setActiveView("journal")}>Journal</button>
        <button onClick={() => setActiveView("breathing")}>Breathing</button>
        <button onClick={() => setActiveView("checklist")}>Checklist</button>
      </nav>
      {page}
    </div>
  );
}

export default App;
