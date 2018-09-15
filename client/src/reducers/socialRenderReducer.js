import {
  SET_CONTENT_CALENDAR,
  GET_CLIENT_CONTENT,
  CONTENT_LOADING,
  DELETE_CONTENT,
  CREATE_COMMENT,
  DELETE_COMMENT
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
        socialRenderContent: state.socialRenderContent.filter(x => x._id !== action.payload)
      };
    case CREATE_COMMENT:
      return {
        ...state,
        socialRenderContent: state.socialRenderContent.map(
          x => (x._id === action.payload._id ? action.payload : x)
        ),
        loading: false
      };
    case DELETE_COMMENT:
      return {
        ...state,
        socialRenderContent: state.socialRenderContent.map(x => {
          x.comments = x.comments.filter(c => c._id !== action.payload);
          return x;
        }),

        loading: false
      };
    default:
      return state;
  }
}
