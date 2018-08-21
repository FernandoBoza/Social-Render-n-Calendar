import axios from 'axios';
import {
  GET_ALL_CLIENTS_PROFILES,
  GET_CLIENT_PROFILE,
  GET_ERRORS,
  CLIENT_LOADING,
  CLEAR_CURRENT_USER
} from './types';

// GET ALL Client Profile
export const getAllClients = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/clients')
    .then(res =>
      dispatch({ type: GET_ALL_CLIENTS_PROFILES, payload: res.data })
    )
    .catch(err => dispatch({ type: GET_ALL_CLIENTS_PROFILES, payload: null }));
};

// POST: Create Client
export const createClient = (clientData, history) => dispatch => {
  axios
    .post('/api/clients', clientData)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// GET Client Profile by Handle
export const getAClient = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/clients/handle/${handle}`)
    .then(res => dispatch({ type: GET_CLIENT_PROFILE, payload: res.data }))
    .catch(err => dispatch({ type: GET_CLIENT_PROFILE, payload: null }));
};

// UPDATE Single Client Profile
export const updateAClient = (handle, clientData, history) => dispatch => {
  dispatch(setProfileLoading());
  axios
    .put(`/api/clients/handle/${handle}`, clientData)
    .then(res => history.push(`/clients/${handle}`))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// DELETE client by handle
export const deleteClient = (handle, history) => dispatch => {
  axios
    .delete(`/api/clients/handle/${handle}`)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

//Profile Loading
export const setProfileLoading = () => {
  return {
    type: CLIENT_LOADING
  };
};

//Clear Current User
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_USER
  };
};
