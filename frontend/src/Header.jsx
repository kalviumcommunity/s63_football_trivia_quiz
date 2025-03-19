import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav>
      <h1>Football Trivia Quiz</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/add-question">Add Question</Link></li>
      </ul>
    </nav>
  );
};

export default Header;
