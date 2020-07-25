import React from 'react';
import { connect } from 'react-redux';
import { getRoomInfo, getRoomPosts } from '../api/rooms';
import NavBar from '../components/dashboard/nav';
import PostCard from '../components/dashboard/postCard';

import '../css/roomdetails.css';

class RoomDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {/*
            posts: [
                {
                    author: "5f1b77ffd585f76113483812",
                    content: "This is a mock post",
                    date: Date.now
                },
                {
                    author: "5f1b77ffd585f76113483812",
                    content: "This is a second mock post",
                    date: Date.now
                }
            ]
        */}
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

    loadPosts() {
        getRoomPosts(this.state.room._id)
            .then(response => {
                this.setState({
                    posts: response.data
                })
                console.log("success")
                console.log(this.state)
            })
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
        return (<div>
            <NavBar name={this.props.auth.user.firstName ? this.props.auth.user.firstName : "User"}/>
            {this.state.room ? 
            <div class="page__container">
                <div class="room__header">
                    <div class="room__top">
                        <p class="room__title">{this.state.room.name}</p>
                        <p class="room__category">{this.renderCategory(this.state.room.category)}</p>
                    </div>
                    <p class="room__description">{this.state.room.description}</p>
                </div>
                <div class="room__body">
                    <h2 class="room__subtitle">Posts</h2>
                    {this.state.posts ?
                        (<div>
                            {this.state.posts.posts.reverse().map(post => (<PostCard author={post.author} content={post.content} date={post.date}/>))}
                        </div>) :
                        this.loadPosts()
                        //(<p class="room__description">No posts yet.</p>) && this.loadPosts()
                    }
                </div>
            </div> : this.loadRoomDetails() }
        </div>)
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(RoomDetails);