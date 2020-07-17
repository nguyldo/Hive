import React from 'react';
import '../../../css/dashboard.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/authActions';

class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    logout() {
        console.log("pressed logout")
        this.props.logoutUser();
    }

    render() {
        return (
            <div id="dashboard__navbar">
                <img src="/logo_v1.jpg" alt="Logo" id="navbar__logo" />
                <Link id="navbar__name" onClick={this.props.logoutUser} to="/">Log out</Link>
                <Link id="navbar__name" to="/dashboard">{this.props.name}</Link>
                <Link id="navbar__name" to="/create-room">Create a new room</Link>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(mapStateToProps, { logoutUser })(NavBar);