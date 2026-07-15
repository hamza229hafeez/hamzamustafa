import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App'; import './styles.css';
import { routerBase } from './config';
const node=document.getElementById('root')!; const app=<React.StrictMode><BrowserRouter basename={routerBase}><App/></BrowserRouter></React.StrictMode>;
node.hasChildNodes()?hydrateRoot(node,app):createRoot(node).render(app);
