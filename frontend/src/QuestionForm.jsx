import React, { useState, useEffect } from 'react';

const QuestionForm = () => {
  const [formData, setFormData] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    creator_name: '',
    created_by: '' // Changed from userId to created_by to match backend
  });
  
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  
  // Fetch existing questions when component mounts or when selectedUser changes
  useEffect(() => {
    fetchQuestions();
  }, [selectedUser]);
  
  // Fetch all users for the dropdown
  useEffect(() => {
    fetchUsers();
  }, []);
  
  // Function to fetch users from the API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/users/all');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching users:', err);
      setLoading(false);
    }
  };
  
  // Function to fetch all questions from the API, optionally filtered by user
  const fetchQuestions = async () => {
    try {
      setLoading(true);
      
      // Build URL with query parameters if a user is selected
      let url = 'http://localhost:5000/api/quiz';
      if (selectedUser) {
        url = `http://localhost:5000/api/quiz/user/${selectedUser}`;
      }
      
      const response = await fetch(url);
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
  
  // Handle user selection for filtering
  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };
  
  // Handle input changes for question field
  const handleQuestionChange = (e) => {
    setFormData({
      ...formData,
      question: e.target.value
    });
  };
  
  // Handle input changes for creator name field
  const handleCreatorNameChange = (e) => {
    setFormData({
      ...formData,
      creator_name: e.target.value
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
      correctAnswer: Number(optionIndex) // Ensure it's a number
    });
  };
  
  // Handle editing a question
  const handleEdit = (question) => {
    setEditMode(true);
    setEditId(question._id);
    setFormData({
      question: question.question,
      options: [...question.options],
      correctAnswer: question.correctAnswer,
      creator_name: question.creator_name || '',
      created_by: question.created_by || '' // Include created_by when editing
    });
    
    // Scroll to form
    document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth' });
  };
  
  // Handle canceling edit mode
  const handleCancelEdit = () => {
    setEditMode(false);
    setEditId(null);
    setFormData({
      question: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      creator_name: '',
      created_by: '' // Also reset created_by
    });
  };
  
  // Handle deleting a question
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this question?')) {
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`http://localhost:5000/api/quiz/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete question');
      }
      
      // Update questions list by removing the deleted question
      setQuestions(questions.filter(q => q._id !== id));
      
      // Show success message
      setSuccessMessage('Question deleted successfully!');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      console.error('Error deleting question:', err);
    }
  };

  // Handle form submission (for both adding and updating)
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
    
    if (formData.correctAnswer === '' || formData.correctAnswer === undefined) {
      setError('Please select a correct answer');
      return;
    }
    
    // Final data preparation with proper types
    const finalData = {
      ...formData,
      question: formData.question.trim(),
      options: formData.options.map(opt => opt.trim()),
      correctAnswer: Number(formData.correctAnswer),
      creator_name: formData.creator_name.trim() || 'Anonymous',
      created_by: formData.created_by || null // Include user relationship
    };
    
    console.log('Submitting data:', finalData);
    
    try {
      setLoading(true);
      setError(null);
      
      let url = 'http://localhost:5000/api/quiz';
      let method = 'POST';
      
      // If in edit mode, use PUT method and include the question ID in the URL
      if (editMode && editId) {
        url = `${url}/${editId}`;
        method = 'PUT';
      }
      
      console.log(`Sending ${method} request to ${url}`);
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalData),
      });
      
      const responseData = await response.json();
      
      if (!response.ok) {
        console.error('Server responded with error:', responseData);
        throw new Error(responseData.message || `Failed to ${editMode ? 'update' : 'add'} question`);
      }
      
      console.log('Server response:', responseData);
      
      const resultQuestion = responseData;
      
      // Reset form data
      setFormData({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: '',
        creator_name: '',  // Reset creator name too
        created_by: ''     // Reset user association
      });
      
      // Exit edit mode if we were in it
      if (editMode) {
        setEditMode(false);
        setEditId(null);
        // Update the questions list by replacing the edited question
        setQuestions(questions.map(q => q._id === editId ? resultQuestion : q));
        setSuccessMessage('Question updated successfully!');
      } else {
        // Add the new question to the list
        setQuestions([...questions, resultQuestion]);
        setSuccessMessage('Question added successfully!');
      }
      
      // Show success message
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      console.error(`Error ${editMode ? 'updating' : 'adding'} question:`, err);
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
          {successMessage}
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
          <button onClick={() => console.log('Current form data:', formData)} style={{
            marginLeft: '10px',
            background: 'transparent',
            border: '1px solid red',
            color: 'red',
            padding: '2px 5px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.8rem'
          }}>
            Debug
          </button>
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
        <h3>{editMode ? 'Edit Question' : 'Add New Question'}</h3>
        <form onSubmit={handleSubmit}>
          {/* Creator Name Field */}
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="creator_name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Your Name:
            </label>
            <input
              type="text"
              id="creator_name"
              value={formData.creator_name}
              onChange={handleCreatorNameChange}
              style={{ 
                width: '100%', 
                padding: '0.75rem',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
              placeholder="Enter your name (or leave empty for 'Anonymous')"
            />
          </div>
          
          {/* User Selection Dropdown for creating quizzes */}
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="userSelect" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Associate with User:
            </label>
            <select
              id="userSelect"
              value={formData.created_by}
              onChange={(e) => setFormData({...formData, created_by: e.target.value})}
              style={{ 
                width: '100%', 
                padding: '0.75rem',
                borderRadius: '4px',
                border: '1px solid #ccc',
                backgroundColor: 'white'
              }}
            >
              <option value="">No User Association</option>
              {users.map(user => (
                <option key={user._id} value={user._id}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>
          
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
                  className={formData.correctAnswer === index ? 'selected' : ''}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '4px',
                    border: formData.correctAnswer === index 
                      ? '2px solid green' 
                      : '1px solid #ccc',
                    background: formData.correctAnswer === index 
                      ? 'rgba(0, 255, 0, 0.1)' 
                      : 'white',
                    cursor: 'pointer'
                  }}
                >
                  {formData.correctAnswer === index ? 'Correct ✓' : 'Set as Correct'}
                </button>
              </div>
            ))}
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
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
              {loading ? 'Submitting...' : editMode ? 'Update Question' : 'Add Question'}
            </button>
            
            {editMode && (
              <button
                type="button"
                className="btn"
                onClick={handleCancelEdit}
                style={{ 
                  background: '#e74c3c',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '4px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 'bold'
                }}
              >
                Cancel Edit
              </button>
            )}
          </div>
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
        <div style={{ marginBottom: '1.5rem' }}>
          <h3>Added Questions</h3>
          
          {/* User Filter Dropdown */}
          <div className="form-group" style={{ marginTop: '1rem' }}>
            <label htmlFor="userFilter" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Filter by User:
            </label>
            <select
              id="userFilter"
              value={selectedUser}
              onChange={handleUserChange}
              style={{ 
                width: '100%', 
                padding: '0.75rem',
                borderRadius: '4px',
                border: '1px solid #ccc',
                backgroundColor: 'white'
              }}
            >
              <option value="">All Users</option>
              {users.map(user => (
                <option key={user._id} value={user._id}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>
        </div>
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
                <div style={{ marginBottom: '0.5rem' }}>
                  <h4 style={{ 
                    marginTop: 0, 
                    marginBottom: '0.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span>Question by: {question.creator_name}</span>
                  </h4>
                  <div style={{
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    marginBottom: '1rem'
                  }}>
                    {question.question}
                  </div>
                </div>
                <div style={{ marginLeft: '1rem' }}>
                  {question.options && question.options.map((option, optIndex) => (
                    <div key={optIndex} style={{ 
                      marginBottom: '0.5rem',
                      color: optIndex === question.correctAnswer ? 'green' : 'inherit',
                      fontWeight: optIndex === question.correctAnswer ? 'bold' : 'normal'
                    }}>
                      {option} {optIndex === question.correctAnswer && '✓'}
                    </div>
                  ))}
                </div>
                <div style={{ 
                  display: 'flex', 
                  gap: '0.5rem', 
                  marginTop: '1rem',
                  justifyContent: 'flex-end'
                }}>
                  <button
                    onClick={() => handleEdit(question)}
                    style={{
                      background: '#3498db',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: '4px',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(question._id)}
                    style={{
                      background: '#e74c3c',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: '4px',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button>
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