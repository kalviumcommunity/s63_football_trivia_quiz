import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Reset error
    setError(null);
    
    // Validate inputs
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }
    
    setLoading(true);
    
    try {
      // Call the login API
      const response = await fetch("http://localhost:5002/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
      
      // Store token and user data in localStorage
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      // Reset form
      setUsername("");
      setPassword("");
      
      // Redirect to home page
      navigate("/");
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content-container">
      <h2>Login to Your Account</h2>
      <div className="football-animation"></div>
      
      {error && (
        <div style={{ 
          background: 'rgba(255, 0, 0, 0.1)',
          color: 'red',
          padding: '1rem',
          borderRadius: '4px',
          marginBottom: '1rem',
          maxWidth: '400px',
          margin: '0 auto 1rem auto'
        }}>
          {error}
        </div>
      )}
      
      <form onSubmit={handleLogin} style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p style={{ marginTop: '2rem' }}>
        Don't have an account? <Link to="/signup" style={{ color: '#5d9e64', fontWeight: 'bold' }}>Sign up</Link>
      </p>
    </div>
  );
};

export default LoginPage;