import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Route, BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Landing from './pages/landing';

ReactDOM.render(
  <Router>
    <div>
      <Route path="/" exact component={Landing} />
      <Route path="/dashboard" exact component={Dashboard} />
    </div>
  </Router>,
  document.getElementById('root')
);