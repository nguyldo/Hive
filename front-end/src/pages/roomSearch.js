import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { getRoomByCategory, joinRoom } from './../api/rooms';
import NavBar from '../components/dashboard/nav';
import RoomCard from './../components/dashboard/roomCard';
import './../css/roomsearch.css';

class RoomSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            category: "learning"
        }
    }

    onSubmit = e => {
        e.preventDefault()

        getRoomByCategory(this.state.category)
            .then(response => {
                this.setState({
                    posts: response.data
                })
                console.log(this.state)
            })
            .catch(err => console.log(err))
    }

    onSelectChange = e => {
        this.setState({ category: e.target.value })
    }

    join = e => {
        const roomId = e.target.value;

        joinRoom(roomId, this.props.auth.user._id)
            .then(response => console.log("joined room!"))
    }

    render() {
        return (<div>
            <NavBar name={this.props.auth.user.firstName ? this.props.auth.user.firstName : "User"}/>
            <div class="page__container">
                <p class="search__title">Search for a new room</p>
                <form id="searchForm" onSubmit={this.onSubmit}>
                    <select class="form__input" onChange={this.onSelectChange}>
                        <option selected value="learning">Learning</option>
                        <option value="hobbies">Hobbies</option>
                        <option value="physical-wellness">Physical Wellness</option>
                        <option value="mental-wellness">Mental Wellness</option>
                    </select>
                    <button type="submit" class="form__submit">Find</button>
                </form>
                {this.state.posts  && this.state.posts.length ? <div class="search__results">
                    {this.state.posts.map(room => {
                        return (<div class="search__individual">
                            <RoomCard name={room.name} description={room.description} category={room.category} />
                            <button value={room._id} class="search__join" onClick={this.join}>Join</button>
                        </div>)
                    })}
                </div> : <div></div>}
            </div>
        </div>)
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(RoomSearch);