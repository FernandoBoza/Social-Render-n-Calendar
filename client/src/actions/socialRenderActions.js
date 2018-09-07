import axios from 'axios';
import {
  CONTENT_LOADING,
  SET_CONTENT_CALENDAR,
  GET_ERRORS,
  GET_CLIENT_CONTENT,
  DELETE_CONTENT,
  CLEAR_ERRORS,
  CREATE_COMMENT,
  DELETE_COMMENT
} from './types';

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

//GET Content By Calendar month and year
export const getContentByDate = (m, y) => dispatch => {
  dispatch(setSocialRenderLoading());
  axios
    .get(`/api/content-calendar/${m}/${y}`)
    .then(res => dispatch({ type: SET_CONTENT_CALENDAR, payload: res.data }))
    .catch(err => dispatch({ type: SET_CONTENT_CALENDAR, payload: null }));
};

//GET Post By Client Name
export const getClientContentByDate = (clientHandle, m, y) => dispatch => {
  dispatch(setSocialRenderLoading());
  axios
    .get(`/api/content-calendar/${clientHandle}/${m}/${y}`)
    .then(res => dispatch({ type: SET_CONTENT_CALENDAR, payload: res.data }))
    .catch(err => dispatch({ type: SET_CONTENT_CALENDAR, payload: null }));
};

// POST create Social Render
export const createSocialRender = (socialContent, history) => dispatch => {
  axios
    .post('/api/social-render', socialContent)
    .then(res => history.push('/content-calendar'))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
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
export const updateClientContent = (id, socialContent, history) => dispatch => {
  dispatch(setSocialRenderLoading());
  axios
    .put(`/api/social-render/id/${id}`, socialContent)
    .then(res => history.push(`/content-calendar`))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// DELETE content by id
export const deleteContent = id => dispatch => {
  axios
    .delete(`/api/content-calendar/id/${id}`)
    .then(res => dispatch({ type: DELETE_CONTENT, payload: id }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// GET Post by id Content Calendar
export const getContentById = id => dispatch => {
  dispatch(setSocialRenderLoading());
  axios
    .get(`/api/content-calendar/id/${id}`)
    .then(res => dispatch({ type: GET_CLIENT_CONTENT, payload: res.data }))
    .catch(err => dispatch({ type: GET_CLIENT_CONTENT, payload: null }));
};

// ADD A Like By Id
export const likeComment = (id, comment_id) => dispatch => {
  axios
    .post(`/api/content-calendar/id/${id}/comment/${comment_id}/like`)
    .then(res => dispatch(getContentById()))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// REMOVE A Like By Id
export const unLikeComment = (id, comment_id) => dispatch => {
  axios
    .post(`/api/content-calendar/id/:_id/comment/:comment_id/unlike`)
    .then(res => dispatch(getContentById()))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Add Comment
export const addComment = (id, commentData) => dispatch => {
  dispatch(setSocialRenderLoading());
  axios
    .post(`/api/content-calendar/id/${id}/comment`, commentData)
    .then(res =>
      dispatch({
        type: CREATE_COMMENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// DELETE comment by id
export const deleteComment = (id, comment_id) => dispatch => {
  axios
    .delete(`/api/content-calendar/id/${id}/comment/${comment_id}`)
    .then(res => dispatch({ type: DELETE_COMMENT, payload: comment_id }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

//Social Render Loading
export const setSocialRenderLoading = () => {
  return {
    type: CONTENT_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
