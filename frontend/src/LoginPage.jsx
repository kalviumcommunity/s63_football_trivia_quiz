import React, { useState } from "react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login attempted with", { username, password });
  };

  return (
    <div className="content-container">
      <h2>Login to Your Account</h2>
      <div className="football-animation"></div>
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
        >
          Login
        </button>
      </form>
      <p style={{ marginTop: '2rem' }}>
        Don't have an account? <a href="#" style={{ color: '#5d9e64', fontWeight: 'bold' }}>Sign up</a>
      </p>
    </div>
  );
};

export default LoginPage;
