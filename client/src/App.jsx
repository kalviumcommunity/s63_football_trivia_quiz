import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [username, setUsername] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch questions from the backend API when component mounts
  useEffect(() => {
    fetchQuestions();
  }, []);
  
  // Function to fetch questions from the backend API
  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/quiz');
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Map the data to match the expected format (changing 'answer' to 'correctAnswer')
      const formattedData = data.map(item => ({
        ...item,
        correctAnswer: item.answer
      }));
      
      // Get random questions from the fetched data
      const randomQuestions = getRandomQuestions(formattedData);
      setQuizQuestions(randomQuestions);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setError('Failed to load questions. Please try again later.');
      setLoading(false);
    }
  };
  
  // Function to randomly select 25 questions from the question pool
  const getRandomQuestions = (questions, count = 25) => {
    // If there are fewer questions than requested, return all of them
    if (questions.length <= count) {
      return questions;
    }
    
    // Make a copy of the question data to avoid modifying the original
    const shuffled = [...questions];
    
    // Shuffle the array using Fisher-Yates algorithm
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // Return the first 'count' questions
    return shuffled.slice(0, count);
  };

  const handleAnswerClick = (selectedAnswer) => {
    if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handleStartGame = () => {
    if (username.trim() !== '') {
      // Select random questions when starting the game
      fetchQuestions();
      setCurrentQuestion(0);
      setScore(0);
      setShowScore(false);
      setGameStarted(true);
    } else {
      alert('Please enter your name to start the quiz!');
    }
  };
  
  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    // Get a new set of random questions when restarting
    fetchQuestions();
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Football Trivia Quiz</h1>
      </header>

      <main className="main-content">
        {!gameStarted ? (
          <div className="welcome-screen">
            <h2>Welcome to the Football Trivia Quiz!</h2>
            <p>Test your knowledge of football with our interactive quiz. Each game features 25 random questions from our database of football trivia questions!</p>
            <div className="start-form">
              <input 
                type="text" 
                placeholder="Enter your name" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <button onClick={handleStartGame} className="primary-button">Start Quiz</button>
            </div>
          </div>
        ) : showScore ? (
          <div className="score-section">
            <h2>Quiz Completed!</h2>
            <p className="score-text">
              {username}, you scored {score} out of {quizQuestions.length}
            </p>
            <div className="score-percentage">
              {Math.round((score / quizQuestions.length) * 100)}%
            </div>
            <div className="score-message">
              {score === quizQuestions.length ? 'Perfect! You\'re a football expert!' :
               score >= quizQuestions.length * 0.8 ? 'Great job! You really know your football!' :
               score >= quizQuestions.length * 0.6 ? 'Good effort! You know quite a bit about football.' :
               score >= quizQuestions.length * 0.4 ? 'Not bad! Keep learning about football.' :
               'Keep practicing! You\'ll get better with time.'}
            </div>
            <button onClick={handleRestart} className="primary-button">Play Again</button>
          </div>
        ) : loading ? (
          <div className="loading">
            <p>Loading questions from the server...</p>
          </div>
        ) : error ? (
          <div className="error">
            <p>{error}</p>
            <button onClick={fetchQuestions} className="primary-button">Try Again</button>
          </div>
        ) : quizQuestions.length > 0 ? (
          <div className="quiz-section">
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>/{quizQuestions.length}
            </div>
            <div className="question-text">
              {quizQuestions[currentQuestion].question}
            </div>
            <div className="answer-options">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <button 
                  key={index} 
                  onClick={() => handleAnswerClick(option)}
                  className="answer-button"
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="current-score">
              Current Score: {score}
            </div>
          </div>
        ) : (
          <div className="loading">
            <p>No questions available. Please try again later.</p>
            <button onClick={fetchQuestions} className="primary-button">Reload Questions</button>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Football Trivia Quiz. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App