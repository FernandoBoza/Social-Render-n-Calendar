import axios from 'axios';
import { SOCIAL_RENDER_LOADING, SET_CONTENT_CALENDAR, GET_ERRORS, GET_CLIENT_CONTENT } from './types';

// GET Social Render Profiles
export const getAllSocialRender = () => dispatch => {
  dispatch(setSocialRenderLoading());
  axios
    .get('/api/content-calendar')
    .then(res => dispatch({ type: SET_CONTENT_CALENDAR, payload: res.data }))
    .catch(err => dispatch({ type: SET_CONTENT_CALENDAR, payload: null }));
};

//GET Post By Client Name
export const getByClientName = clientHandle => dispatch => {
  dispatch(setSocialRenderLoading());
  axios
    .get(`/api/content-calendar/${clientHandle}`)
    .then(res => dispatch({ type: SET_CONTENT_CALENDAR, payload: res.data }))
    .catch(err => dispatch({ type: SET_CONTENT_CALENDAR, payload: null }));
};

// POST create Social Render
export const createSocialRender = (socialRenderContent, history) => dispatch => {
  axios
    .post('/api/social-render', socialRenderContent)
    .then(res => history.push('/content-calendar'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//GET Post By Id
export const getContentbyClient = id => dispatch => {
  dispatch(setSocialRenderLoading());
  axios
    .get(`/api/social-render/id/${id}`)
    .then(res => dispatch({ type: GET_CLIENT_CONTENT, payload: res.data }))
    .catch(err => dispatch({ type: GET_CLIENT_CONTENT, payload: null }));
};

// UPDATE Single Content
export const updateClientContent = (id, clientData, history) => dispatch => {
  dispatch(setSocialRenderLoading());
  axios
    .put(`/api/social-render/id/${id}`, clientData)
    .then(res => history.push(`/content-calendar`))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

//Social Render Loading
export const setSocialRenderLoading = () => {
  return {
    type: SOCIAL_RENDER_LOADING
  };
};
