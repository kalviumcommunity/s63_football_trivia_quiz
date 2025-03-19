import React from 'react';

const Testimonials = () => {
  const testimonialsList = [
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'Project Manager',
      company: 'TechCorp',
      quote: 'TaskFlow has transformed how our team collaborates. We\'ve reduced meeting time by 30% and increased project delivery speed significantly.',
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'CTO',
      company: 'Innovate Solutions',
      quote: 'The analytics and reporting features have given us unprecedented visibility into our workflows. It\'s like having a project management superpower.',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      position: 'Team Lead',
      company: 'Creative Designs',
      quote: 'Our team adopted TaskFlow in just one day. The intuitive interface and powerful features make it the perfect tool for our fast-paced environment.',
    },
  ];

  return (
    <section className="testimonials" id="testimonials">
      <div className="section-header">
        <h2>What Our Customers Say</h2>
        <p>Join thousands of teams already using TaskFlow to improve productivity</p>
      </div>
      
      <div className="testimonials-container">
        {testimonialsList.map(testimonial => (
          <div className="testimonial-card" key={testimonial.id}>
            <div className="quote-mark">"</div>
            <p className="testimonial-quote">{testimonial.quote}</p>
            <div className="testimonial-author">
              <div className="author-avatar">
                {/* Placeholder for avatar - using initials */}
                <div className="avatar-initials">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              <div className="author-info">
                <h4>{testimonial.name}</h4>
                <p>{testimonial.position}, {testimonial.company}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;