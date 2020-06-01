import React from 'react';
import './../css/landing.css';
import { Link } from 'react-router-dom';
//import logo from '/logo512.png';

export default class LandingNavBar extends React.Component {
    render() {
        return (<div id="landingNavBar">
            <Link to="/" ><img src="/logo_v1.jpg" alt="Logo" id="navBarLogo" /></Link>
            <Link to="/dashboard" className="navBarOption">Dashboard</Link>
            <Link to="/login" className="navBarOption">Log In</Link>
            <Link to="/" className="navBarOption">Register</Link>
        </div>);
    }
}