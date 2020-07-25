import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUserInfo } from '../api/user';
import { createRoom } from '../api/rooms';
import NavBar from '../components/dashboard/nav';

import { Form } from 'react-bootstrap';

class CreateRoom extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            roomName: "",
            description: "",
            category: "learning"
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

    onSelectChange = e => {
        this.setState({ category: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault();

        const room = {
            name: this.state.roomName,
            description: this.state.description,
            creator: this.props.auth.user._id,
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
            <NavBar name={this.props.auth.user.firstName ? this.props.auth.user.firstName : "User"}/>
            <div class="page__container">
                <form id="createRoomForm" onSubmit={this.onSubmit}>
                    <p class="form__title">Room Name</p>
                    <input type="text" class="form__input" id="roomName" onChange={this.onChange} />
                    <p class="form__title">Description</p>
                    <input type="text" class="form__input" id="description" onChange={this.onChange} />
                    <p class="form__title">Category</p>
                    <select class="form__input" onChange={this.onSelectChange}>
                        <option selected value="learning">Learning</option>
                        <option value="hobbies">Hobbies</option>
                        <option value="physical-wellness">Physical Wellness</option>
                        <option value="mental-wellness">Mental Wellness</option>
                    </select>
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