import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Dashboard from './pages/dashboard';
import Landing from './pages/landing';
import LoginForm from './pages/loginForm';
import RegisterForm from './pages/registerForm';
import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { setUser } from './actions/authActions';
import createRoom from './pages/createRoom';
import { getUserInfo } from './api/user';

if (localStorage.jwtToken) {
    const token = localStorage.jwtToken;
    setAuthToken(token);
    const decoded = jwt_decode(token);
    //store.dispatch(setUser(localStorage.user));
    getUserInfo(decoded.id)
        .then(user => {
            store.dispatch(setUser(user.data))
        })
}

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
                        <Route path="/create-room" exact component={createRoom}/>
                    </div>
                </Router>
            </Provider>
        );
    }
}