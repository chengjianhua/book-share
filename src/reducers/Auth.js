import {Map} from 'immutable';
import ActionTypes from '../constants/ActionTypes';

const defaultState = new Map({
  isAuthenticated: false,
});

function auth(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.AUTHENTICATE_USER_SUCCESS:
      return state.set('isAuthenticated', true);
    default:
      return state;
  }
}

export default auth;
