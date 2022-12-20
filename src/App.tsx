import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { CardPage } from "./main/Card";
import { Menu } from "./Menu";
import { TrainingPage } from "./training/TrainingPage";

if (process.env.NODE_ENV === "development") {
  const { worker } = require("./browser");
  worker.start();
}

function App() {
  return (
    <HashRouter>
      <div className="Layout">
        <Menu />
        <header className="App-header">
          <Routes>
            <Route path="/" element={<CardPage />} />
            <Route
              path="/training"
              element={
                <TrainingPage/>
              }
            />
            <Route path="/list" element={<span>List</span>} />
            <Route path="/edit" element={<CardPage />} />
          </Routes>
        </header>
      </div>
    </HashRouter>
  );
}

export default App;
