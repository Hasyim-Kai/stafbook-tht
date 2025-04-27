import '@/assets/css/satoshi.css';
import '@/assets/css/scrollbar.css';
import '@/assets/css/style.css';
import { Routes } from '@generouted/react-router';
import 'flatpickr/dist/flatpickr.min.css';
import 'jsvectormap/dist/css/jsvectormap.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
);
