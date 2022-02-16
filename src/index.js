import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './hello/App';
// import App from './hello-again/App';
import App from './expense-tracker/App';
// import App from './todos/App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
