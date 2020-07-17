import React from 'react';
import axios from 'axios';
import './../css/dashboard.css';
import { connect } from 'react-redux';
import { getUserInfo } from '../api/user';
import { getUserCreatedRooms } from '../api/rooms';
import { setUserInfo } from '../actions/authActions';
import NavBar from '../components/dashboard/nav';
import RoomCard from '../components/dashboard/roomCard';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                email: "",
                firstName: "",
                lastName: "",
                /* 
                rooms: [{
                    name: "",
                    description: "",
                    creator: "",
                    members: [""],
                    requests: [""],
                    category: "",
                    date: "",
                    id: ""
                }]*/
            }
        }
    }

    loadRooms() {
        if (this.props.auth.user._id) {
            console.log("got here")
            console.log(this.props.auth.user)
            getUserCreatedRooms(this.props.auth.user._id)
                .then(response => {
                    this.setState({
                        rooms: response.data
                    });
                })
                .catch(err => console.log(err))
        }
    }

    render() {
        return (
            <div id="dashboard">
                <NavBar name={this.props.auth.user.firstName ? this.props.auth.user.firstName : "User"}/>
                <div id="dashboard__content">
                    <p id="dashboard__title">Your Rooms</p>
                    {/*<RoomCard name="My First Room" description="A short description of my very first room. Enjoy :)" />*/
                    this.state.rooms ? this.state.rooms.map(room => {return (
                        <RoomCard name={room.name} description={room.description} category={room.category} />
                    )}) : this.loadRooms()
                    }
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Dashboard);