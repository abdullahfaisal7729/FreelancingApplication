import React from 'react';
import Feature from '../../components/feature/Feature';
import './features.css';

const featuresData = [
  {
    title: 'The best for every budget',
    text: 'Find high-quality services at every price point. No hourly rates, just project-based pricing.',
  },
  {
    title: 'Quality work done quickly',
    text: 'Find the right freelancer to begin working on your project within minutes.',
  },
  {
    title: 'Protected payments, every time',
    text: 'Always know what you&apos;ll pay upfront. Your payment isn&apos;t released until you approve the work.',
  },
  {
    title: '24/7 support',
    text: 'Questions? Our round-the-clock support team is available to help anytime, anywhere.',
  },
];

const Features = () => (
  <div className="gpt3__features section__padding" id="features">
    <div className="gpt3__features-heading">
      <h1 className="gradient__text">A whole world of freelance talent at your fingertips</h1>
      <p>Request Early Access to Get Started</p>
    </div>
    <div className="gpt3__features-container">
      {featuresData.map((item, index) => (
        <Feature title={item.title} text={item.text} key={item.title + index} />
      ))}
    </div>
  </div>
);

export default Features;
