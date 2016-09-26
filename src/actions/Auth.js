import ActionTypes from '../constants/ActionTypes';
import {fromJS} from 'immutable';
import {fetchJson} from '../core/fetch';
import {canUseDOM} from 'exenv';

/* eslint-disable consistent-return */
export function readToken() {
  return function (dispatch) {
    if (canUseDOM) {
      const token = localStorage.getItem('token');
      dispatch({
        type: ActionTypes.READ_TOKEN_SUCCESS,
        token,
      });
    }
  };
}

export function removeToken() {
  return function (dispatch) {
    if (canUseDOM) {
      localStorage.removeItem('token');
      dispatch({
        type: ActionTypes.REMOVE_TOKEN_SUCCESS,
      });
    }
  };
}

export function writeToken(token) {
  return function (dispatch) {
    if (canUseDOM) {
      localStorage.setItem('token', token);
      dispatch({
        token,
        type: ActionTypes.WRITE_TOKEN_SUCCESS,
      });
    }
  };
}

export function authenticate(username, password) {
  return function (dispatch) {
    return fetchJson('/manage/authenticate', {
      method: 'POST',
      body: JSON.stringify({
        username, password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(json => {
      dispatch(writeToken(json.token));
      dispatch({
        type: ActionTypes.AUTHENTICATE_USER_SUCCESS,
      });
      return json;
    });
  };
}
