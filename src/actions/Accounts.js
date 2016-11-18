import ActionTypes from '../constants/ActionTypes';
// import isomorphicFetch from 'isomorphic-fetch';
import {fetchJson, postJson} from '../core/fetch';

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
      dispatch({
        type: ActionTypes.FETCH_USER_PROFILE_FAILURE,
        error,
      });
    });
  };
}

export function updateUserProfile(newProfile) {
  const {username} = newProfile;
  return function (dispatch) {
    dispatch({
      type: ActionTypes.UPDATE_USER_PROFILE_DOING,
    });

    return postJson(`/api/accounts/${username}/profile`, {
      body: JSON.stringify(newProfile),
    })
    .then(({profile}) => {
      if (canUseDOM) {
        localStorage.setItem('profile', JSON.stringify(profile));
      }

      dispatch({
        type: ActionTypes.UPDATE_USET_PROFILE_SUCCESS,
        data: fromJS(profile),
      });
    })
    .catch((error) => {
      dispatch({
        type: ActionTypes.UPDATE_USER_PROFILE_FAILURE,
        error,
      });
    });
  };
}

export function fetchStarredBooks(username) {
  return function (dispatch) {
    dispatch({
      type: ActionTypes.FETCH_USER_STARRED_BOOKS_DOING,
    });

    return fetchJson(`/api/accounts/${username}/stars/books`)
      .then(({data}) => {
        dispatch({
          type: ActionTypes.FETCH_USER_STARRED_BOOKS_SUCCESS,
          data: fromJS(data),
        });
      })
      .catch(error => {
        dispatch({
          type: ActionTypes.FETCH_USER_STARRED_BOOKS_FAILURE,
          error,
        });
      });
  };
}
