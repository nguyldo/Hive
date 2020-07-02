import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authActions';
import LandingNavBar from '../components/landingNavBar';
import '../css/accountpages.css';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }

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

        // console.log("Log in: " + this.state.email + " " + this.state.password)
        const user = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.loginUser(user);
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
                    <span class="form__error">{this.state.errors.email}</span>
                    <p class="form__title">Password</p>
                    <input type="password" class="form__input" id="password" onChange={this.onChange} />
                    <span class="form__error">{this.state.errors.password}</span>
                    <button type="submit" class="form__submit">Log in</button>
                </form>
            </div>
        </div>);
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

LoginForm.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { loginUser })(LoginForm);