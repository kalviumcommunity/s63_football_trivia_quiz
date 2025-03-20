import React, { useState, useEffect } from 'react';
import QuizCard from './components/QuizCard.jsx';

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');

  // Fetch users for the dropdown
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users/all');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    fetchUsers();
  }, []);
  
  // Fetch questions from backend API
  // Reset quiz state when changing users
  useEffect(() => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
  }, [selectedUser]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError(null); // Clear any previous errors
        const url = new URL('http://localhost:5000/api/quiz');
        if (selectedUser) {
          url.searchParams.append('userId', selectedUser);
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        const data = await response.json();
        
        // Format questions to match our component's expected structure
        const formattedQuestions = data.map(q => ({
          question: q.question,
          options: q.options,
          correctAnswer: q.answer
        }));
        
        // Randomly select 5 questions
        const randomQuestions = getRandomQuestions(formattedQuestions, 5);
        setQuestions(randomQuestions);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error('Error fetching questions:', err);
      }
    };
    
    fetchQuestions();
  }, [selectedUser]); // Re-fetch when selected user changes
  
  // Function to get random questions
  const getRandomQuestions = (allQuestions, count) => {
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
  
  // If still loading, show loading message
  if (loading) {
    return (
      <div className="content-container">
        <h2>Loading Questions...</h2>
        <div className="football-animation"></div>
        <p>Preparing your football trivia challenge!</p>
      </div>
    );
  }
  
  // If there was an error, show error message
  if (error) {
    return (
      <div className="content-container">
        <h2>Error Loading Questions</h2>
        <div className="football-animation"></div>
        <p>Sorry, we couldn't load the questions. Please try again later.</p>
        <p>{error}</p>
      </div>
    );
  }
  
  // If no questions were loaded, show message
  if (questions.length === 0) {
    return (
      <div className="content-container">
        <h2>No Questions Available</h2>
        <div className="football-animation"></div>
        <p>Sorry, there are no questions available right now.</p>
      </div>
    );
  }

  const handleAnswer = (selectedOption) => {
    if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
  };

  return (
    <div className="content-container">
      <h2>Football Trivia Quiz</h2>
      <div className="football-animation"></div>
      
      {/* User filter dropdown */}
      <div style={{ 
        marginBottom: '2rem', 
        maxWidth: '600px', 
        margin: '0 auto 2rem auto'
      }}>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          style={{
            width: '100%',
            padding: '0.8rem',
            borderRadius: '4px',
            border: '2px solid #4a7c50',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            fontSize: '1rem',
            marginBottom: '1rem'
          }}
        >
          <option value="">All Questions</option>
          {users.map(user => (
            <option key={user._id} value={user._id}>
              {user.username}'s Questions
            </option>
          ))}
        </select>
      </div>
      
      {!showResults ? (
        <div className="quiz-container" style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
          <div className="question-number" style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 'bold' }}>
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
          
          <div className="question-card" style={{ 
            background: 'rgba(255, 255, 255, 0.1)', 
            padding: '2rem',
            borderRadius: '8px',
            marginBottom: '2rem',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
          }}>
            <h3 style={{ marginBottom: '1.5rem' }}>{questions[currentQuestionIndex].question}</h3>
            <div className="options">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <button 
                  key={index} 
                  onClick={() => handleAnswer(option)}
                  className="btn"
                  style={{ 
                    display: 'block', 
                    width: '100%', 
                    marginBottom: '1rem',
                    textAlign: 'left',
                    padding: '1rem'
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="results" style={{ 
          background: 'rgba(255, 255, 255, 0.1)', 
          padding: '2rem',
          borderRadius: '8px',
          marginTop: '2rem',
          textAlign: 'center',
          maxWidth: '600px',
          margin: '0 auto',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
        }}>
          <h3>Quiz Results</h3>
          <div className="football-animation"></div>
          <p style={{ fontSize: '1.2rem', margin: '1.5rem 0' }}>
            You scored {score} out of {questions.length}!
          </p>
          <button onClick={restartQuiz} className="btn">
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;