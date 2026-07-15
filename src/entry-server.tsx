import React from 'react'; import { renderToString } from 'react-dom/server'; import { StaticRouter } from 'react-router-dom/server'; import App from './App'; import { routerBase } from './config';
export function render(url:string){const location=routerBase==='/'?url:`${routerBase}${url}`;return renderToString(<StaticRouter basename={routerBase} location={location}><App/></StaticRouter>)}
