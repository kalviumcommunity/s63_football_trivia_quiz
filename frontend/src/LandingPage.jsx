import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate("/quiz");
  };

  return (
    <div className="content-container">
      <h2>Welcome to the Football Trivia Quiz!</h2>
      <div className="football-animation"></div>
      <p>Test your football knowledge and compete with others.</p>
      <p>Join thousands of football fans in this exciting quiz game and prove you're the ultimate football expert!</p>
      <button className="btn" onClick={handleStartQuiz}>Start Quiz</button>
    </div>
  );
};

export default LandingPage;
