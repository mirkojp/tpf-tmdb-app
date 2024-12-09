import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import FilmDetail from "./components/FilmDetail"; // Assume you have a FilmDetail component
import TrailerPage from "./components/TrailerPage";
function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the main page */}
        <Route path="/" element={<Main />} />
        {/* Route for the film detail page */}
        <Route path="/film/:id" element={<FilmDetail />} />
        <Route path="/film/:id/trailer" element={<TrailerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
