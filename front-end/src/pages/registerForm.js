import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../actions/authActions';
import LandingNavBar from '../components/landingNavBar';
import classnames from 'classnames';
import '../css/accountpages.css';

class RegisterForm extends React.Component {
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();

        const newUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            retypePassword: this.state.retypePassword
        };

        this.props.registerUser(newUser);
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
                    <button type="submit" class="form__submit">Register</button>
                </form>
            </div>
        </div>);
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

RegisterForm.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { registerUser })(RegisterForm);