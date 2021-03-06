import isEmpty from '../validation/is-empty';
import {
  SET_CURRENT_USER,
  GET_ALL_USERS,
  USERS_LOADING,
  GET_USER_BY_ID,
  CREATE_CLIENT_USER
} from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {},
  users: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USERS_LOADING:
      return {
        ...state,
        loading: true
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        loading: false
      };
    case GET_ALL_USERS:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        users: action.payload,
        loading: false
      };
    case GET_USER_BY_ID:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        users: action.payload,
        loading: false
      };
    case CREATE_CLIENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        users: [action.payload, ...state.users],
        loading: false
      };
    default:
      return state;
  }
}
