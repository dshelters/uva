import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/App.jsx';
import ModalGallery from './components/modalExample.jsx';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

ReactDOM.render(
  <Router>
    <Route component={App} />
  </Router>
  , document.getElementById('app'));

// ReactDOM.render(<ModalGallery />, document.getElementById('app'));