import React from 'react';
import ReactDOM from 'react-dom/client';
import {router} from './app/router';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import '@radix-ui/themes/styles.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
