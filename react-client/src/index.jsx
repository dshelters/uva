import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/App.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

ReactDOM.render(
  <Router>
    <App />
  </Router>
  , document.getElementById('app'));