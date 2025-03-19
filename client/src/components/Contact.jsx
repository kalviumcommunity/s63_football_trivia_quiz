import React, { useState } from 'react';

const Contact = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, this would send the email to a server
    console.log('Subscription email:', email);
    alert(`Thank you for subscribing with: ${email}`);
    setEmail('');
  };

  return (
    <section className="contact" id="contact">
      <div className="cta-container">
        <div className="cta-content">
          <h2>Ready to Transform Your Workflow?</h2>
          <p>
            Join thousands of teams already using TaskFlow to improve productivity
            and deliver projects on time.
          </p>
          
          <form onSubmit={handleSubmit} className="subscription-form">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="primary-button">Get Started Free</button>
          </form>
          
          <p className="form-disclaimer">
            Free 14-day trial. No credit card required. Cancel anytime.
          </p>
        </div>
      </div>
      
      <div className="contact-info">
        <div className="contact-methods">
          <div className="contact-method">
            <h3>Email Us</h3>
            <p>info@taskflow.example.com</p>
          </div>
          <div className="contact-method">
            <h3>Call Us</h3>
            <p>+1 (555) 123-4567</p>
          </div>
          <div className="contact-method">
            <h3>Visit Us</h3>
            <p>123 Productivity Lane, Suite 200<br />San Francisco, CA 94103</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;