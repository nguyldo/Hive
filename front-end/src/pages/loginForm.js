import React from 'react';
import {Link} from 'react-router-dom';
import LandingNavBar from '../components/landingNavBar';
import '../css/accountpages.css';

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();

        console.log("Log in: " + this.state.email + " " + this.state.password)
    }

    render() {
        return (<div>
            <LandingNavBar />
            <div  class="accountform">
                <h1 class="accountform__title">Login</h1>
                <p class="accountform__switch">Don't have an account? Register <Link to="/register" class="accountform__link">here</Link>.</p>
                <form id="loginForm" onSubmit={this.onSubmit}>
                    <p class="form__title">Email</p>
                    <input type="text" class="form__input" id="email" onChange={this.onChange} />
                    <p class="form__title">Password</p>
                    <input type="password" class="form__input" id="password" onChange={this.onChange} />
                    <button type="submit" class="form__submit">Log in</button>
                </form>
            </div>
        </div>);
    }
}