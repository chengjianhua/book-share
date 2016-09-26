import {Map} from 'immutable';
import ActionTypes from '../constants/ActionTypes';

const defaultState = new Map({
  isAuthenticated: false,
  token: null,
  username: null,
});

function auth(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.AUTHENTICATE_USER_SUCCESS:
      return state.set('isAuthenticated', true);
    case ActionTypes.READ_TOKEN_SUCCESS:
      return state.set('token', action.token)
        .set('username', action.username);
    case ActionTypes.WRITE_TOKEN_SUCCESS:
      return state.set('token', action.token);
    case ActionTypes.REMOVE_TOKEN_SUCCESS:
      return state.set('token', null);
    default:
      return state;
  }
}

export default auth;
