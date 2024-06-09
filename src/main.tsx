import { UIProvider } from "@yamada-ui/react";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';
import "/src/output.css";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <BrowserRouter>
    <UIProvider>
    <AppRoutes />
    </UIProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
