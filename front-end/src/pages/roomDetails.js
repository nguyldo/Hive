import React from 'react';
import { connect } from 'react-redux';
import { getRoomInfo } from '../api/rooms';
import NavBar from '../components/dashboard/nav';

class RoomDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    loadRoomDetails() {
        getRoomInfo(this.props.location.state.id)
            .then(response => {
                this.setState({
                    room: response.data
                })
                console.log(this.state)
            })
            .catch(err => console.log(err))
    }

    render() {
        return (<div>
            <NavBar name={this.props.auth.user.firstName ? this.props.auth.user.firstName : "User"}/>
            {this.state.room ? <div>
                <h1>{this.state.room.name}</h1>
                <p>{this.state.room.description}</p>
            </div> : this.loadRoomDetails() }
        </div>)
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(RoomDetails);