import axios from 'axios';

export async function getUserInfo(id) {
    return await axios.get('http://localhost:3005/users/find/' + id)
        .catch(err => console.log(err));
}