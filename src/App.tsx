import { HashRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { Card } from "./Card";
const apiUrl = "https://wrv6ojgvlg6d2b247hrvzdrv4y0zcybj.lambda-url.eu-north-1.on.aws/Production";

function App() {
  return (
    <HashRouter>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Card />} />
            <Route path="/training" element={<span>Training <Link to={"/"}>Back</Link></span>} />
            <Route path="/list" element={<span>List</span>} />
            <Route path="/edit" element={<Card />} />
          </Routes>
          <Link to={"training"}>Go to training</Link>
        </header>
      </div>
    </HashRouter>
  );
}

export default App;
