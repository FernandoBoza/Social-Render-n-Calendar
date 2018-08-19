import { SET_CONTENT_CALENDAR, GET_CLIENT_CONTENT } from '../actions/types';

const initialState = {
  socialRenderContent: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CONTENT_CALENDAR:
      return {
        ...state,
        socialRenderContent: action.payload
      };
    case GET_CLIENT_CONTENT:
      return {
        ...state,
        socialRenderContent: action.payload
      };
    default:
      return state;
  }
}
