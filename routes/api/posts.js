// require node libraries
const express = require('express');
const mongoose = require('mongoose');
const Posts = require('../../models/Posts');

const router = express.Router();

router.post('/addPost', (request, response) => {
    const newPost = {
        content: request.body.content,
        author: request.body.userId
        //date: Date.now
    }
    Posts.updateOne({roomId: request.body.roomId}, {$push: {posts: newPost}})
        .then(newDoc => response.json(newDoc))
        .catch(err => response.json(err))
});

router.get('/getPostsByRoom/:roomId', (request, response) => {
    const roomId = request.params.roomId;

    Posts.findOne({roomId: roomId})
        .then(posts => {
            if (posts) return response.status(200).json(posts);
            return response.status(404).json({error: "No posts found"});
        })
})

module.exports = router;