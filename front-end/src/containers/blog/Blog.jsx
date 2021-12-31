import React from 'react';
import Article from '../../components/article/Article';
import { blog01, blog02, blog03, blog04, blog05 } from './imports';
import './blog.css';

const Blog = () => (
  <div className="gpt3__blog section__padding" id="blog">
    <div className="gpt3__blog-heading">
      <h1 className="gradient__text">A lot is happening, <br /> We are ready for it.</h1>
    </div>
    <div className="gpt3__blog-container">
      <div className="gpt3__blog-container_groupA">
        <Article imgUrl={blog01} text="Organize and run your work using buisness solutions" />
      </div>
      <div className="gpt3__blog-container_groupB">
        <Article imgUrl={blog02} text="Build you brand & Logo Design" />
        <Article imgUrl={blog03} text="Customize your site using WordPress" />
        <Article imgUrl={blog04} text="Reach more customers with the help of Social Media" />
        <Article imgUrl={blog05} text="Engage your Audience with Video Explainer" />
      </div>
    </div>
  </div>
);

export default Blog;
