// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Use 'react-dom/client' for React 18+
import App from './App'; // Import your main App component
import './index.css'; // Import global styles (where Tailwind is configured)

const rootElement = document.getElementById('root');

// Use createRoot for React 18+
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);