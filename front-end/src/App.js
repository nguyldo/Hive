import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Dashboard from './pages/dashboard';
import Landing from './pages/landing';
import LoginForm from './pages/loginForm';
import RegisterForm from './pages/registerForm';

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div>
                        <Route path="/" exact component={Landing} />
                        <Route path="/dashboard" exact component={Dashboard} />
                        <Route path="/login" exact component={LoginForm} />
                        <Route path="/register" exact component={RegisterForm} />
                    </div>
                </Router>
            </Provider>
        );
    }
}