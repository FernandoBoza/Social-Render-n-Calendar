import { GET_ALL_CLIENTS_PROFILES, GET_CLIENT_PROFILE, CLIENT_LOADING, CLEAR_CURRENT_USER } from '../actions/types';

const initialState = {
  client: null,
  clients: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CLIENT_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ALL_CLIENTS_PROFILES:
      return {
        ...state,
        clients: action.payload,
        loading: false
      };
    case GET_CLIENT_PROFILE:
      return {
        ...state,
        client: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_USER:
      return {
        ...state,
        loading: false,
        clients: null
      };
    default:
      return state;
  }
}
