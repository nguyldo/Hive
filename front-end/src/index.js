import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Route, BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Landing from './pages/landing';
import LoginForm from './pages/loginForm';
import RegisterForm from './pages/registerForm';

ReactDOM.render(
  <Router>
    <div>
      <Route path="/" exact component={Landing} />
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/login" exact component={LoginForm} />
      <Route path="/register" exact component={RegisterForm} />
    </div>
  </Router>,
  document.getElementById('root')
);