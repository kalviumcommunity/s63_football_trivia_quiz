import React from 'react';
import QuizCard from './components/Quizcard';

const App = () => {
  // Array of questions with options and correct answers
  const questions = [
    {
      question: "Who won the FIFA World Cup in 2022?",
      options: ["Brazil", "Argentina", "France", "Germany"],
      correctAnswer: "Argentina",
    },
    {
      question: "Which player has the most Ballon d'Or awards?",
      options: ["Lionel Messi", "Cristiano Ronaldo", "Michel Platini", "Johan Cruyff"],
      correctAnswer: "Lionel Messi",
    },
    {
      question: "Which club has won the most UEFA Champions League titles?",
      options: ["Barcelona", "Bayern Munich", "Real Madrid", "Liverpool"],
      correctAnswer: "Real Madrid",
    },
    {
      question: "Who is known as 'The Egyptian King'?",
      options: ["Mohamed Salah", "Sadio Mané", "Riyad Mahrez", "Pierre-Emerick Aubameyang"],
      correctAnswer: "Mohamed Salah",
    },
    {
      question: "Which country has the most FIFA World Cup titles?",
      options: ["Germany", "Brazil", "Italy", "Argentina"],
      correctAnswer: "Brazil",
    },
  ];

  return (
    <div className="App">
      <h1>Football Trivia Quiz</h1>
      {questions.map((question, index) => (
        <QuizCard
          key={index} // Unique key for each question
          question={question.question}
          options={question.options}
          correctAnswer={question.correctAnswer}
        />
      ))}
    </div>
  );
};

export default App;