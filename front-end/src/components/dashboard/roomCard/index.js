import React from 'react';
import '../../../css/dashboard.css';
import { Link } from 'react-router-dom';

class RoomCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="roomcard">
                <p id="roomcard__title">{this.props.name}</p>
                <p id="roomcard__description">{this.props.description}</p>
            </div>
        )
    }
}


export default RoomCard;