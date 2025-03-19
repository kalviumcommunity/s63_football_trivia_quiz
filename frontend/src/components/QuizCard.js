import React from 'react';

const QuizCard = ({ question, options, correctAnswer }) => {
  return (
    <div className="quiz-card">
      <h3>{question}</h3>
      <ul>
        {options.map((option, index) => (
          <li key={index}>{option}</li>
        ))}
      </ul>
      <p>Correct Answer: {correctAnswer}</p>
    </div>
  );
};

export default QuizCard;