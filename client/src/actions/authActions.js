import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login User I:  Get User token
export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      const { token } = res.data; // Save To Browser localStorage
      localStorage.setItem('jwtToken', token); // Set Token to localStorage
      setAuthToken(token); // Set Token to Auth Header
      const decoded = jwt_decode(token); // Decode Token To Get User Data
      dispatch(setCurrentUser(decoded)); // Set Current User
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login User II:  Set Logged In User
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log User Out
export const logoutUser = () => dispatch => {
  // Remove Token from Local Storage
  localStorage.removeItem('jwtToken');
  // Remove Auth Header For Future Request
  setAuthToken(false);
  // Set Current Uset to {} Which Will Set isAuthenicated to False
  dispatch(setCurrentUser({}));
};
