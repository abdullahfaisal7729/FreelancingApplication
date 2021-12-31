import React from 'react';
import Feature from '../../components/feature/Feature';
import './whatGPT3.css';

const WhatGPT3 = () => (
  <div className="gpt3__whatgpt3 section__margin" id="wgpt3">
    <div className="gpt3__whatgpt3-feature">
      <Feature title="viscric buisness." text="A business solution designed for teams. Upgrade to a curated experience packed with tools and benefits, dedicated to businesses. Fiverr Business is all about collaboration. Our business tool allows you to organize and manage all your projects, communication, deliveries, and budgeting in a minimum span of time." />
    </div>
    <div className="gpt3__whatgpt3-heading">
      <h1 className="gradient__text">The possibilities are beyond your imagination</h1>
    </div>
    <div className="gpt3__whatgpt3-container">
      <Feature title="Experience" text="Connect to freelancers with proven business experience." />
      <Feature title="Education" text="Get matched with the perfect talent by a customer success manager." />
      <Feature title="Knowledgebase" text="Manage teamwork and boost productivity with one powerful workspace." />
    </div>
  </div>
);

export default WhatGPT3;
