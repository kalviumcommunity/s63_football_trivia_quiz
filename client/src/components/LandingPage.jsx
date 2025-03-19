import React from 'react';
import Hero from './Hero';
import Features from './Features';
import Testimonials from './Testimonials';
import Pricing from './Pricing';
import Contact from './Contact';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="header">
        <div className="logo">
          <h1>TaskFlow</h1>
        </div>
        <nav className="navigation">
          <ul>
            <li><a href="#features">Features</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <div className="header-buttons">
          <button className="secondary-button">Log In</button>
          <button className="primary-button">Sign Up Free</button>
        </div>
      </header>

      <main>
        <Hero />
        <Features />
        <Testimonials />
        <Pricing />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;