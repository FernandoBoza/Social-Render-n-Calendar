import axios from 'axios';
import { GET_SOCIAL_RENDER, SOCIAL_RENDER_LOADING, GET_ERRORS } from './types';

// GET Social Render Profiles
export const getAllSocialRender = () => dispatch => {
  dispatch(setSocialRenderLoading());
  axios
    .get('/api/social-render')
    .then(res =>
      dispatch({
        type: GET_SOCIAL_RENDER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_SOCIAL_RENDER,
        payload: null
      })
    );
};

// POST create Social Render
export const createSocialRender = (socialRenderContent, history) => dispatch => {
  axios
    .post('/api/social-render', socialRenderContent)
    .then(res => history.push('/social-render'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Social Render Loading
export const setSocialRenderLoading = () => {
  return {
    type: SOCIAL_RENDER_LOADING
  };
};
