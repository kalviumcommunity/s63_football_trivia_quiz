import React from 'react';

const Pricing = () => {
  const pricingPlans = [
    {
      id: 1,
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for individuals and small projects',
      features: [
        'Up to 5 projects',
        'Basic task management',
        'Limited file storage (100MB)',
        'Email support'
      ],
      buttonText: 'Get Started',
      isPopular: false
    },
    {
      id: 2,
      name: 'Pro',
      price: '$12',
      period: 'per user/month',
      description: 'Ideal for growing teams and businesses',
      features: [
        'Unlimited projects',
        'Advanced task management',
        'Expanded file storage (10GB)',
        'Priority email support',
        'Team collaboration tools',
        'Advanced reporting'
      ],
      buttonText: 'Start Free Trial',
      isPopular: true
    },
    {
      id: 3,
      name: 'Enterprise',
      price: '$29',
      period: 'per user/month',
      description: 'For large organizations with complex needs',
      features: [
        'Everything in Pro',
        'Unlimited file storage',
        'Custom integrations',
        '24/7 phone support',
        'Dedicated account manager',
        'Advanced security features',
        'Custom reporting'
      ],
      buttonText: 'Contact Sales',
      isPopular: false
    }
  ];

  return (
    <section className="pricing" id="pricing">
      <div className="section-header">
        <h2>Simple, Transparent Pricing</h2>
        <p>Choose the plan that fits your needs</p>
      </div>
      
      <div className="pricing-container">
        {pricingPlans.map(plan => (
          <div 
            className={`pricing-card ${plan.isPopular ? 'popular' : ''}`} 
            key={plan.id}
          >
            {plan.isPopular && <div className="popular-badge">Most Popular</div>}
            <h3 className="plan-name">{plan.name}</h3>
            <div className="plan-price">
              <span className="price">{plan.price}</span>
              <span className="period">/{plan.period}</span>
            </div>
            <p className="plan-description">{plan.description}</p>
            <ul className="plan-features">
              {plan.features.map((feature, index) => (
                <li key={index}>✓ {feature}</li>
              ))}
            </ul>
            <button 
              className={`plan-button ${plan.isPopular ? 'primary-button' : 'secondary-button'}`}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;