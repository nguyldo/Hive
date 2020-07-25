// require node libraries
const mongoose = require('mongoose');

const PostsSchema = new mongoose.Schema({
    roomId: {
        type: String,
        required: true
    },
    posts:  {
        type: [{
                content: {
                    type: String,
                    required: true
                },
                author: {
                    type: String,
                    required: true
                },
                date: {
                    type: Date,
                    default: Date.now
                }
            }],
        default: []
    }
    
});

module.exports = Room = mongoose.model('posts', PostsSchema);