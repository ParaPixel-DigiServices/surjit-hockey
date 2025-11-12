import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import MainLayout from './components/layout/MainLayout';
import App from './App';

/**
 * Entry point for the application
 * - Wraps App in BrowserRouter for route support.
 * - StrictMode is enabled for development diagnostics.
 */
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
