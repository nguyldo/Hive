import axios from 'axios';

export async function getUserCreatedRooms(id) {
    return await axios.get('http://localhost:3005/rooms/findByUser/' + id)
        .catch(err => console.log(err));
}

export async function getRoomByCategory(category) {
    return await axios.get('http://localhost:3005/rooms/findByCategory/' + category)
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

export async function joinRoom(roomId, userId) {
    return await axios.post('http://localhost:3005/rooms/join/', {
        roomId: roomId,
        userId: userId
    })
        .catch(err => console.log(err))
}

export async function getRoomPosts(id) {
    return await axios.get('http://localhost:3005/posts/getPostsByRoom/' + id)
        .catch(err => console.log(err));
}

export async function createNewPost(roomId, userId, content) {
    return await axios.post('http://localhost:3005/posts/addPost', {
        roomId: roomId,
        userId: userId,
        content: content
    })
        .catch(err => console.log(err))
}