import React from 'react';
import '../App.css';

const Loading = () => (
  <div className="loading-overlay">
    <div className="loading-container">
      <img src="/assets/sw-loading.gif" alt="Loading" className="loading-gif" />
      <p>Loading Characters...</p>
    </div>
  </div>
);

export default Loading;