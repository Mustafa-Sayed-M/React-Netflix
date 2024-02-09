import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';

// Main Component:
import App from './App';


// Font Awesome Css File:
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';

// Bootstrap Css File:
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

// Index Css File
import './index.css'; // Keep this file next bootstrap css file to override on bootstrap styles!

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>
);
