import {List, Map} from 'immutable';
import ActionTypes from '../constants/ActionTypes';

const defaultState = new Map({
  books: new Map({
    isLoading: true,
    data: new List(),
  }),
  profile: new Map({
    username: '',
    signature: '',
    gender: '',
  }),
});

function fetchUserBooks(state, action) {
  switch (action.type) {
    case ActionTypes.FETCH_USER_BOOKS_DOING:
      return state.setIn(['books', 'isLoading'], true);
    case ActionTypes.FETCH_USER_BOOKS_SUCCESS:
      return state.setIn(['books', 'isLoading'], false)
        .setIn(['books', 'data'], action.data);
    case ActionTypes.FETCH_USER_BOOKS_FAILURE:
      return state.setIn(['books', 'isLoading'], false);
    default:
      return state;
  }
}

function fetchUserProfile(state, action) {
  switch (action.type) {
    case ActionTypes.FETCH_USER_PROFILE_SUCCESS:
      return state.set('profile', action.data);
    default:
      return state;
  }
}

function updateUserProfile(state, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_USER_PROFILE_SUCCESS:
      return state.set('profile', action.data);
    default:
      return state;
  }
}

export default function accounts(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.FETCH_USER_BOOKS_DOING:
    case ActionTypes.FETCH_USER_BOOKS_SUCCESS:
    case ActionTypes.FETCH_USER_BOOKS_FAILURE:
      return fetchUserBooks(state, action);
    case ActionTypes.FETCH_USER_PROFILE_DOING:
    case ActionTypes.FETCH_USER_PROFILE_SUCCESS:
    case ActionTypes.FETCH_USER_PROFILE_FAILURE:
      return fetchUserProfile(state, action);
    case ActionTypes.UPDATE_USER_PROFILE_SUCCESS:
      return updateUserProfile(state, action);
    default:
      return state;
  }
}
