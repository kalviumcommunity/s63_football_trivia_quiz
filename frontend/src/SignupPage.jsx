import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./LoginPage.css"; // Reusing login page styles

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    // Basic validation
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required");
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    
    try {
      setLoading(true);
      
      // Send signup data to the server
      const response = await fetch("http://localhost:5002/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to sign up");
      }
      
      // Show success message
      setSuccess(true);
      
      // Clear form
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
      
      // Redirect to login page after a delay
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content-container">
      <h2>Create Your Account</h2>
      <div className="football-animation"></div>
      
      {error && (
        <div className="error-message" style={{ 
          background: "rgba(255, 0, 0, 0.1)",
          color: "red",
          padding: "1rem",
          borderRadius: "4px",
          marginBottom: "1rem"
        }}>
          {error}
        </div>
      )}
      
      {success && (
        <div className="success-message" style={{ 
          background: "rgba(0, 255, 0, 0.1)",
          color: "green",
          padding: "1rem",
          borderRadius: "4px",
          marginBottom: "1rem"
        }}>
          Registration successful! Redirecting to login page...
        </div>
      )}
      
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            style={{ 
              width: '100%', 
              padding: '0.8rem', 
              borderRadius: '4px',
              border: '2px solid #4a7c50',
              fontSize: '1rem'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={{ 
              width: '100%', 
              padding: '0.8rem', 
              borderRadius: '4px',
              border: '2px solid #4a7c50',
              fontSize: '1rem'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={{ 
              width: '100%', 
              padding: '0.8rem', 
              borderRadius: '4px',
              border: '2px solid #4a7c50',
              fontSize: '1rem'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={{ 
              width: '100%', 
              padding: '0.8rem', 
              borderRadius: '4px',
              border: '2px solid #4a7c50',
              fontSize: '1rem'
            }}
          />
        </div>
        
        <button 
          type="submit" 
          className="btn"
          style={{ width: '100%' }}
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
      
      <p style={{ marginTop: '2rem' }}>
        Already have an account? <Link to="/login" style={{ color: '#5d9e64', fontWeight: 'bold' }}>Log in</Link>
      </p>
    </div>
  );
};

export default SignupPage;