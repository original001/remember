import { HashRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { Card } from "./Card";

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./browser')
  worker.start()
}

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
