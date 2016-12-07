import { Map } from 'immutable';
import ActionTypes from 'ActionTypes';

const defaultState = new Map({
  isAuthenticated: false,
  token: null,
  username: null,
  profile: new Map(),
});

function auth(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.AUTHENTICATE_USER_SUCCESS:
      return state.set('isAuthenticated', true);
    case ActionTypes.READ_TOKEN_SUCCESS:
      return state.set('token', action.token)
        .set('username', action.username)
        .set('profile', action.profile);
    case ActionTypes.REMOVE_TOKEN_SUCCESS:
      return state.set('token', null);
    default:
      return state;
  }
}

export default auth;
