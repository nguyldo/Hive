import axios from 'axios';

export async function getUserCreatedRooms(id) {
    return await axios.get('http://localhost:3005/rooms/findByUser/' + id)
        .catch(err => console.log(err));
}

export async function createRoom(room) {
    return await axios.post('http://localhost:3005/rooms/create', room)
        .catch(err => console.log(err));
}

export async function getRoomInfo(id) {
    return await axios.get('http://localhost:3005/rooms/find/' + id)
        .catch(err => console.log(err));
}