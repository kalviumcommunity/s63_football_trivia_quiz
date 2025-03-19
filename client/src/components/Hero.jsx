import React from 'react';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Streamline Your Workflow with TaskFlow</h1>
        <p className="hero-subtitle">
          The all-in-one project management solution that helps teams collaborate, 
          track progress, and deliver results faster.
        </p>
        <div className="cta-buttons">
          <button className="primary-button">Get Started Free</button>
          <button className="secondary-button">Watch Demo</button>
        </div>
      </div>
      <div className="hero-image">
        {/* Placeholder for hero image */}
        <div className="image-placeholder">
          <div className="placeholder-text">Dashboard Preview</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;