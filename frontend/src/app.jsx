import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage";
import LoginPage from "./LoginPage";
import Quiz from "./Quiz";
import QuestionForm from "./QuestionForm";
import Header from "./Header";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/add-question" element={<QuestionForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
