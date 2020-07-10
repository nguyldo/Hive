import React from 'react';
import '../../../css/dashboard.css';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="dashboard__navbar">
                <img src="/logo_v1.jpg" alt="Logo" id="navbar__logo" />
                <Link id="navbar__name">{this.props.name}</Link>
            </div>
        )
    }
}


export default NavBar;