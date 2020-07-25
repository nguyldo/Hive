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
                <Link class="navbar__home" to="/dashboard">Hive</Link>
                <Link class="navbar__option" onClick={this.props.logoutUser} to="/">Log out</Link>
                <Link class="navbar__option" to="/create-room">Create a new room</Link>
                <Link class="navbar__option" to="/search">Search</Link>
                <Link class="navbar__option">Hi, {this.props.name}</Link>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(mapStateToProps, { logoutUser })(NavBar);