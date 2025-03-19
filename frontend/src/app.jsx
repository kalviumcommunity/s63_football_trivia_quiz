import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import LandingPage from "./LandingPage";
import LoginPage from "./LoginPage";
import Quiz from "./Quiz";
import QuestionForm from "./QuestionForm";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/add-question" element={<QuestionForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;