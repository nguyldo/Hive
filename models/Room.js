// require node libraries
const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    creator: {
        type: String,
        required: true
    },
    members: {
        type: [String],
        required: true
    },
    requests: {
        type: [String],
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Room = mongoose.model('rooms', RoomSchema);