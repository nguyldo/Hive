import React from 'react';
import { connect } from 'react-redux';
import { getRoomInfo, getRoomPosts, createNewPost } from '../api/rooms';
import NavBar from '../components/dashboard/nav';
import PostCard from '../components/dashboard/postCard';

import '../css/roomdetails.css';

class RoomDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newPostButton: "Create New Post +",
            displayNewPost: false/*
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

        this.toggleNewPost = this.toggleNewPost.bind(this);
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
                let data = response.data
                data.posts = data.posts.reverse()
                this.setState({
                    posts: data
                })
                console.log("success")
                console.log(this.state)
            })
    }

    toggleNewPost() {
        this.setState({
            displayNewPost: !this.state.displayNewPost
        })
        let newText
        if (this.state.displayNewPost) newText = "Create New Post +"
        else newText = "Create New Post -"
        this.setState({
            newPostButton: newText
        })
    }

    handleNewPostChange = e => {
        this.setState({
            currentPost: e.target.value
        })
    }

    submitNewPost = e => {
        e.preventDefault()

        createNewPost(this.state.room._id, this.props.auth.user._id, this.state.currentPost)
            .then(response => window.location.reload(false))
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

    renderNewPost() {
        return (<div class="newpost">
            <form id="newpost__form" onSubmit={this.submitNewPost}>
                <p class="room__subtitle">New Post</p>
                <textarea id="content" class="newpost__content" onChange={this.handleNewPostChange}></textarea>
                <button type="submit" class="newpost__submit">Post</button>
            </form>
        </div>)
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
                    <p class="room__subtitle">Posts</p>
                    {this.state.posts ?
                        (<div>
                            <button onClick={this.toggleNewPost} class="newpost__toggle">{this.state.newPostButton}</button>
                            {this.state.displayNewPost ? this.renderNewPost() : (<div></div>)}
                            {this.state.posts.posts.map(post => (<PostCard author={post.author} content={post.content} date={post.date}/>))}
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