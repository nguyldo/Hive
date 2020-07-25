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
                <div id="roomcard__top">
                    <p id="roomcard__title">{this.props.name}</p>
                    <p id="roomcard__category">{this.renderCategory(this.props.category)}</p>
                </div>
                <p id="roomcard__description">{this.props.description}</p>
            </div>
        )
    }
}


export default RoomCard;