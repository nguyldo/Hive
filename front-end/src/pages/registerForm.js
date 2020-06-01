import React from 'react';
import {Link} from 'react-router-dom';
import LandingNavBar from '../components/landingNavBar';
import '../css/accountpages.css';

export default class RegisterForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            retypePassword: ""
        };
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();

        console.log("Register: " + this.state.firstName + " " + this.state.lastName
                    + " " + this.state.email + " " + this.state.password + " " + this.state.retypePassword);
    }

    render() {
        return (<div>
            <LandingNavBar />
            <div class="accountform">
                <h1 class="accountform__title">Register</h1>
                <p class="accountform__switch">Already have an account? Log in <Link to="/login" class="accountform__link">here</Link>.</p>
                <form id="registerForm" onSubmit={this.onSubmit}>
                    <p class="form__title">First Name</p>
                    <input type="text" class="form__input" id="firstName" onChange={this.onChange} />
                    <p class="form__title">Last Name</p>
                    <input type="text" class="form__input" id="lastName" onChange={this.onChange} />
                    <p class="form__title">Email</p>
                    <input type="text" class="form__input" id="email" onChange={this.onChange} />
                    <p class="form__title">Password</p>
                    <input type="password" class="form__input" id="password" onChange={this.onChange} />
                    <p class="form__title">Retype Password</p>
                    <input type="password" class="form__input" id="retypePassword" onChange={this.onChange} />
                    <button type="submit" class="form__submit">Log in</button>
                </form>
            </div>
        </div>);
    }
}