import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_USER, USER_LOADING } from './types';
import { getUserInfo } from '../api/user';

// User registration
export const registerUser = userData => dispatch => {
    axios.post('http://localhost:3005/users/register', userData)
        .then(res => console.log('User registered!'))
        .catch(err => 
            dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

export const loginUser = userData => dispatch => {
    axios.post('http://localhost:3005/users/login', userData)
        .then(res => {
            console.log('User logged in!');

            const {token} = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decodedToken = jwt_decode(token);

            getUserInfo(decodedToken.id)
                .then(user => {
                    localStorage.setItem('user', user.data);
                    dispatch(setUser(user.data))
                })
            //dispatch(setUser(decodedToken));
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}

export const setUser = decodedToken => {
    return {
        type: SET_USER,
        payload: decodedToken
    };
}

export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
}

export const logoutUser = () => dispatch => {
    console.log("hi")
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setUser({}));
}