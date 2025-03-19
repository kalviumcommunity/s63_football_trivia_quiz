import React from 'react';

const Features = () => {
  const featuresList = [
    {
      id: 1,
      title: 'Task Management',
      description: 'Create, assign, and track tasks with ease. Set priorities, deadlines, and dependencies to keep your projects on track.',
      icon: '📋'
    },
    {
      id: 2,
      title: 'Team Collaboration',
      description: 'Work together seamlessly with real-time updates, comments, and file sharing. Keep everyone aligned and informed.',
      icon: '👥'
    },
    {
      id: 3,
      title: 'Progress Tracking',
      description: 'Visualize project progress with intuitive dashboards and charts. Identify bottlenecks and optimize your workflow.',
      icon: '📊'
    },
    {
      id: 4,
      title: 'Reporting & Analytics',
      description: 'Generate detailed reports on team performance, project status, and resource allocation to make data-driven decisions.',
      icon: '📈'
    }
  ];

  return (
    <section className="features" id="features">
      <div className="section-header">
        <h2>Powerful Features to Boost Productivity</h2>
        <p>Everything you need to manage projects efficiently and deliver results</p>
      </div>
      
      <div className="features-grid">
        {featuresList.map(feature => (
          <div className="feature-card" key={feature.id}>
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;