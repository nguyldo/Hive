// require node libraries
const express = require('express');
const Room = require('../../models/Room');

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
        .then(user => response.json(user))
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

router.get('/findByUser/:userId', (request, response) => {
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

module.exports = router;