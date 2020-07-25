import React from 'react';
import moment from 'moment';
import '../../../css/roomdetails.css';
import { getUserInfo } from '../../../api/user';

class PostCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            author: ""
        }

        this.getName(this.props.author)
    }

    getName(id) {
        getUserInfo(id)
            .then(user => this.setState({author: user.data.firstName + " " + user.data.lastName}))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div class="postcard">
                <div class="postcard__top">
                    <p class="postcard__author">{this.state.author}</p>
                    <p class="postcard__date">{moment(this.props.date).format("h:mm a, M/D/YY")}</p>
                </div>
                <p class="postcard__content">{this.props.content}</p>
            </div>
        )
    }
}


export default PostCard;