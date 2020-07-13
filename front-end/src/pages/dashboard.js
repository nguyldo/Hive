import React from 'react';
import axios from 'axios';
import './../css/dashboard.css';
import { connect } from 'react-redux';
import { getUserInfo } from '../api/user';
import { getUserCreatedRooms } from '../api/rooms';
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
                rooms: [{
                    name: "",
                    description: "",
                    creator: "",
                    members: [""],
                    requests: [""],
                    category: "",
                    date: "",
                    id: ""
                }]
            }
        }
    }

    componentWillMount() {
        
        if (this.props.auth.user.id) {
            getUserInfo(this.props.auth.user.id)
                .then(user => {
                    this.setState({
                        email: user.data.email,
                        firstName: user.data.firstName,
                        lastName: user.data.lastName
                    });
                })
            
            getUserCreatedRooms(this.props.auth.user.id)
                .then(response => {
                    this.setState({
                        rooms: response.data
                    });
                })
        }
        /*
        axios.get('http://localhost:3005/rooms/findByUser/' + this.props.auth.user.id)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        */
    }

    render() {
        return (
            <div id="dashboard">
                <NavBar name={this.state.firstName ? this.state.firstName : "User"}/>
                <div id="dashboard__content">
                    <p id="dashboard__title">Your Rooms</p>
                    {/*<RoomCard name="My First Room" description="A short description of my very first room. Enjoy :)" />*/
                    this.state.rooms? this.state.rooms.map(room => {return (
                        <RoomCard name={room.name} description={room.description} category={room.category} />
                    )}) : (<p></p>)
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