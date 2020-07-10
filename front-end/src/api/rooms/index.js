import axios from 'axios';

export async function getUserCreatedRooms(id) {
    return await axios.get('http://localhost:3005/rooms/findByUser/' + id)
        .catch(err => console.log(err));
}