import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUserInfo } from '../api/user';
import { createRoom } from '../api/rooms';
import NavBar from '../components/dashboard/nav';

class CreateRoom extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            roomName: "",
            description: "",
            category: ""
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
                .catch(err => console.log(err))
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();

        const room = {
            name: this.state.roomName,
            description: this.state.description,
            creator: this.props.auth.user.id,
            category: this.state.category
        }

        //console.log(room)
        createRoom(room)
            .then(response => {
                console.log(response)
                this.props.history.push('/dashboard');
            })
            .catch(err => console.log(err))
    }

    render() {
        return (<div>
            <NavBar name={this.state.firstName ? this.state.firstName : "User"}/>
            <div class="accountform">
                <form id="createRoomForm" onSubmit={this.onSubmit}>
                    <p class="form__title">Room Name</p>
                    <input type="text" class="form__input" id="roomName" onChange={this.onChange} />
                    <p class="form__title">Description</p>
                    <input type="text" class="form__input" id="description" onChange={this.onChange} />
                    <p class="form__title">Category</p>
                    <input type="text" class="form__input" id="category" onChange={this.onChange} />
                    <button type="submit" class="form__submit">Create</button>
                </form>
            </div>
        </div>);
    }
}


const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(CreateRoom);