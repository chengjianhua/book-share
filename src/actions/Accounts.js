import ActionTypes from '../constants/ActionTypes';
// import isomorphicFetch from 'isomorphic-fetch';
import fetch, {fetchJson} from '../core/fetch'; // eslint-disable-line

import {fromJS} from 'immutable';

import {doubanAPI} from '../config'; // eslint-disable-line

import {canUseDOM} from 'exenv';

export function fetchUserBooks(username) {
  return function (dispatch) {
    dispatch({
      type: ActionTypes.FETCH_USER_BOOKS_DOING,
    });
    fetchJson(`/api/accounts/${username}/books`)
    .then(json => {
      const {books} = json;
      dispatch({
        type: ActionTypes.FETCH_USER_BOOKS_SUCCESS,
        data: fromJS(books),
      });
    }).catch(error => {
      console.error(error);
      dispatch({
        type: ActionTypes.FETCH_USER_BOOKS_FAILURE,
        error,
      });
    });
  };
}

export function fetchUserProfile(username) {
  return function (dispatch) {
    dispatch({
      type: ActionTypes.FETCH_USER_PROFILE_DOING,
    });
    fetchJson(`/api/accounts/${username}/profile`)
    .then(json => {
      if (canUseDOM) {
        localStorage.setItem('profile', JSON.stringify(json.profile));
      }
      dispatch({
        type: ActionTypes.FETCH_USER_PROFILE_SUCCESS,
        data: fromJS(json.profile),
      });
    })
    .catch(error => {
      console.error(error);
      dispatch({
        type: ActionTypes.FETCH_USER_PROFILE_FAILURE,
        error,
      });
    });
  };
}

export function updateUserProfile(profile) {
  const {username} = profile;
  return function (dispatch) {
    dispatch({
      type: ActionTypes.UPDATE_USER_PROFILE_DOING,
    });
    return fetchJson(`/api/accounts/${username}/profile`, {
      method: 'POST',
      body: JSON.stringify(profile),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((json) => {
      if (canUseDOM) {
        localStorage.setItem('profile', JSON.stringify(json.profile));
      }
      dispatch({
        type: ActionTypes.UPDATE_USET_PROFILE_SUCCESS,
        data: fromJS(json.profile),
      });
    }).catch(() => {
      dispatch({
        type: ActionTypes.UPDATE_USER_PROFILE_FAILURE,
      });
    });
  };
}
