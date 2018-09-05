import {
  SET_CONTENT_CALENDAR,
  GET_CLIENT_CONTENT,
  CONTENT_LOADING,
  DELETE_CONTENT,
  CREATE_COMMENT
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
        socialRenderContent: state.socialRenderContent.filter(content => content._id !== action.payload)
      };
    case CREATE_COMMENT:
      return {
        ...state,
        socialRenderContent: [action.payload, ...state.socialRenderContent],
        loading: false
      };
    default:
      return state;
  }
}
