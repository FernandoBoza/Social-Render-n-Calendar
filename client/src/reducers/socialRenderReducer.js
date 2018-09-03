import {
  SET_CONTENT_CALENDAR,
  GET_CLIENT_CONTENT,
  CONTENT_LOADING,
  DELETE_CONTENT
} from '../actions/types';

const initialState = {
  socialRenderContent: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CONTENT_LOADING:
      return {
        ...state,
        loading: true
      };
    case SET_CONTENT_CALENDAR:
      return {
        ...state,
        socialRenderContent: action.payload,
        loading: false
      };
    case GET_CLIENT_CONTENT:
      return {
        ...state,
        socialRenderContent: action.payload,
        loading: false
      };
    case DELETE_CONTENT:
      return {
        ...state,
        socialRenderContent: state.socialRenderContent.filter(
          content => content._id !== action.payload
        )
        // loading: false
      };
    default:
      return state;
  }
}
