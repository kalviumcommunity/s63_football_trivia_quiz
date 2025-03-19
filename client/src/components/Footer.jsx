import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: 'Product',
      links: [
        { name: 'Features', url: '#features' },
        { name: 'Pricing', url: '#pricing' },
        { name: 'Testimonials', url: '#testimonials' },
        { name: 'Roadmap', url: '#' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', url: '#' },
        { name: 'Guides', url: '#' },
        { name: 'API Reference', url: '#' },
        { name: 'Blog', url: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', url: '#' },
        { name: 'Careers', url: '#' },
        { name: 'Contact', url: '#contact' },
        { name: 'Privacy Policy', url: '#' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Twitter', url: '#', icon: '𝕏' },
    { name: 'LinkedIn', url: '#', icon: 'in' },
    { name: 'Facebook', url: '#', icon: 'f' },
    { name: 'GitHub', url: '#', icon: '⌨' }
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo">
            <h2>TaskFlow</h2>
          </div>
          <p className="footer-tagline">
            Streamline your workflow and boost productivity
          </p>
          <div className="social-links">
            {socialLinks.map((social, index) => (
              <a 
                href={social.url} 
                key={index} 
                className="social-link"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
        
        <div className="footer-links">
          {footerLinks.map((category, index) => (
            <div className="footer-link-category" key={index}>
              <h3>{category.title}</h3>
              <ul>
                {category.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.url}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} TaskFlow. All rights reserved.</p>
        <p>
          <a href="#">Terms of Service</a> | 
          <a href="#">Privacy Policy</a> | 
          <a href="#">Cookies</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;