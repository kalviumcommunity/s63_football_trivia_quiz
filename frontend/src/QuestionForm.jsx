import React, { useState, useEffect } from 'react';

const QuestionForm = () => {
  const [formData, setFormData] = useState({
    question: '',
    options: ['', '', '', ''],
    answer: ''
  });
  
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  // Fetch existing questions when component mounts
  useEffect(() => {
    fetchQuestions();
  }, []);
  
  // Function to fetch all questions from the API
  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/quiz');
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }
      const data = await response.json();
      setQuestions(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      console.error('Error fetching questions:', err);
    }
  };
  
  // Handle input changes for question field
  const handleQuestionChange = (e) => {
    setFormData({
      ...formData,
      question: e.target.value
    });
  };
  
  // Handle input changes for option fields
  const handleOptionChange = (index, e) => {
    const newOptions = [...formData.options];
    newOptions[index] = e.target.value;
    setFormData({
      ...formData,
      options: newOptions
    });
  };
  
  // Handle selection of correct answer
  const handleAnswerChange = (optionIndex) => {
    setFormData({
      ...formData,
      answer: formData.options[optionIndex]
    });
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.question.trim()) {
      setError('Question text is required');
      return;
    }
    
    if (formData.options.some(option => !option.trim())) {
      setError('All option fields are required');
      return;
    }
    
    if (!formData.answer) {
      setError('Please select a correct answer');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:5000/api/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add question');
      }
      
      const newQuestion = await response.json();
      
      // Reset form data
      setFormData({
        question: '',
        options: ['', '', '', ''],
        answer: ''
      });
      
      // Show success message
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      
      // Update questions list
      setQuestions([...questions, newQuestion]);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      console.error('Error adding question:', err);
    }
  };
  
  return (
    <div className="content-container">
      <h2>Add New Quiz Question</h2>
      <div className="football-animation"></div>
      
      {success && (
        <div className="success-message" style={{ 
          background: 'rgba(0, 255, 0, 0.1)',
          color: 'green',
          padding: '1rem',
          borderRadius: '4px',
          marginBottom: '1rem'
        }}>
          Question added successfully!
        </div>
      )}
      
      {error && (
        <div className="error-message" style={{ 
          background: 'rgba(255, 0, 0, 0.1)',
          color: 'red',
          padding: '1rem',
          borderRadius: '4px',
          marginBottom: '1rem'
        }}>
          Error: {error}
        </div>
      )}
      
      <div className="form-container" style={{ 
        background: 'rgba(255, 255, 255, 0.1)', 
        padding: '2rem',
        borderRadius: '8px',
        marginBottom: '2rem',
        maxWidth: '800px',
        margin: '0 auto',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
      }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="question" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Question:
            </label>
            <input
              type="text"
              id="question"
              value={formData.question}
              onChange={handleQuestionChange}
              style={{ 
                width: '100%', 
                padding: '0.75rem',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
              placeholder="Enter your question here"
              required
            />
          </div>
          
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Options:
            </label>
            {formData.options.map((option, index) => (
              <div key={index} style={{ 
                display: 'flex',
                marginBottom: '0.75rem',
                alignItems: 'center'
              }}>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e)}
                  style={{ 
                    flex: '1',
                    padding: '0.75rem',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    marginRight: '0.5rem'
                  }}
                  placeholder={`Option ${index + 1}`}
                  required
                />
                <button
                  type="button"
                  onClick={() => handleAnswerChange(index)}
                  className={formData.answer === formData.options[index] ? 'selected' : ''}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    border: formData.answer === formData.options[index] 
                      ? '2px solid green' 
                      : '1px solid #ccc',
                    background: formData.answer === formData.options[index] 
                      ? 'rgba(0, 255, 0, 0.1)' 
                      : 'white',
                    cursor: 'pointer'
                  }}
                >
                  {formData.answer === formData.options[index] ? 'Correct ✓' : 'Set as Correct'}
                </button>
              </div>
            ))}
          </div>
          
          <button
            type="submit"
            className="btn"
            style={{ 
              background: '#3498db',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold'
            }}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Add Question'}
          </button>
        </form>
      </div>
      
      <div className="questions-list" style={{ 
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '2rem',
        borderRadius: '8px',
        maxWidth: '800px',
        margin: '0 auto',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
      }}>
        <h3>Added Questions</h3>
        {loading && <p>Loading questions...</p>}
        {questions.length === 0 && !loading && (
          <p>No questions added yet.</p>
        )}
        {questions.length > 0 && (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {questions.map((question, index) => (
              <li key={question._id || index} style={{ 
                marginBottom: '1.5rem',
                padding: '1.5rem',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '4px'
              }}>
                <h4 style={{ marginTop: 0 }}>{question.question}</h4>
                <div style={{ marginLeft: '1rem' }}>
                  {question.options.map((option, optIndex) => (
                    <div key={optIndex} style={{ 
                      marginBottom: '0.5rem',
                      color: option === question.answer ? 'green' : 'inherit',
                      fontWeight: option === question.answer ? 'bold' : 'normal'
                    }}>
                      {option} {option === question.answer && '✓'}
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default QuestionForm;