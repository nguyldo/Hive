import React from 'react';
import '../../../css/dashboard.css';
import { Link } from 'react-router-dom';

class RoomCard extends React.Component {
    constructor(props) {
        super(props);
    }

    renderCategory(category) {
        switch(category) {
            case "learning":
                return "📚";
            case "hobbies":
                return "🪁";
            case "physical-wellness":
                return "💪";
            case "mental-wellness":
                return "😌";
            default:
                return "";
        }
    }

    render() {
        return (
            <div id="roomcard">
                <p id="roomcard__title">{this.props.name}</p>
                <p id="roomcard__description">{this.props.description}</p>
                {this.renderCategory(this.props.category)}
            </div>
        )
    }
}


export default RoomCard;