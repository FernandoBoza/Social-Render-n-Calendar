import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER, GET_ALL_USERS, USERS_LOADING, GET_USER_BY_ID } from './types';

// GET all users
export const getAllUsers = () => dispatch => {
  dispatch(setUsersLoading());
  axios
    .get('/api/users')
    .then(res => dispatch({ type: GET_ALL_USERS, payload: res.data }))
    .catch(err => dispatch({ type: GET_ALL_USERS, payload: null }));
};

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

// Register Client User
export const registerClientUser = (clientUserData, history) => dispatch => {
  axios
    .post('/api/users/register-client', clientUserData)
    .then(res => history.push('/users/manage'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//GET User By Id
export const getUserByID = id => dispatch => {
  dispatch(setUsersLoading());
  axios
    .get(`/api/users/id/${id}`)
    .then(res => dispatch({ type: GET_USER_BY_ID, payload: res.data }))
    .catch(err => dispatch({ type: GET_USER_BY_ID, payload: null }));
};

// Update User By Id
export const updateUserRole = (id, userData, history) => dispatch => {
  dispatch(setUsersLoading());
  axios
    .put(`/api/users/id/${id}`, userData)
    .then(res => history.push(`/users/manage/`))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// DELETE User By Id
export const deleteUser = (id, history) => dispatch => {
  axios
    .delete(`/api/users/id/${id}`)
    .then(res => history.push('/users/manage'))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
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
  localStorage.removeItem('jwtToken'); // Remove Token from Local Storage
  setAuthToken(false); // Remove Auth Header For Future Request
  dispatch(setCurrentUser({})); // Set Current Uset to {} Which Will Set isAuthenicated to False
};

export const setUsersLoading = () => {
  return {
    type: USERS_LOADING
  };
};
