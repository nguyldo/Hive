// require node libraries
const express = require('express');
const mongoose = require('mongoose');
const Room = require('../../models/Room');
const User = require('../../models/User');
const Posts = require('../../models/Posts');

const router = express.Router();

router.post('/create', (request, response) => {
    const newRoom = new Room({
        name: request.body.name,
        description: request.body.description,
        creator: request.body.creator,
        members: [request.body.creator],
        requests: [],
        category: request.body.category
    });

    newRoom.save()
        .then(room => {
            User.update({_id: request.body.creator}, {$push: {rooms: room._id}})
                .then(user => {
                    const newPosts = new Posts({
                        roomId: room._id
                    });

                    newPosts.save()
                        .then(posts => response.json(posts))
                    //response.json(user)
                })
        })
        .catch(err => console.log(err));
});

router.post('/request', (request, response) => {
    Room.findById(request.body.roomId)
        .then(room => {
            if (!room) return response.status(404).json({error: "Room was not found"});
            Room.update({_id: request.body.roomId}, {requests: [...room.requests, request.body.userId]})
                .then(room => response.json(room))
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
});

router.post('/join', (request, response) => {
    Room.findById(request.body.roomId)
        .then(room => {
            if (!room) return response.status(404).json({error: "Room was not found"});
            Room.updateOne({_id: request.body.roomId}, {$push: {members: request.body.userId}})
                .then(room => {
                    User.update({_id: request.body.userId}, {$push: {rooms: request.body.roomId}})
                        .then(user => response.json(room))
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
})

router.get('/find/:id', (request, response) => {
    const id = request.params.id;

    Room.findById(id)
        .then(room => {
            if (room) return response.status(200).json(room);
            return response.status(404).json({error: "Room not found"});
        })
        .catch(err => console.log(err));
})

router.get('/findByUser/:userId', (request, response) => {
    const userId = request.params.userId;

    User.findById(userId)
        .then(user => {
            Room.find({ '_id': { $in: user.rooms } })
                .then(rooms => response.json(rooms))
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
})

router.get('/findUserCreated/:userId', (request, response) => {
    const userId = request.params.userId;

    Room.find({creator: userId})
        .then(rooms => {
            if (rooms) return response.status(200).json(rooms);
            return response.status(404).json({error: "No rooms found"});
        })
        .catch(err => {
            console.log(err);
        })
});

router.get('/findByCategory/:category', (request, response) => {
    const category = request.params.category;

    Room.find({category: category})
        .then(rooms => {
            if (rooms) return response.status(200).json(rooms);
            return response.status(404).json({error: "No rooms found"});
        })
        .catch(err => console.log(err));
})

module.exports = router;