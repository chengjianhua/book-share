import ActionTypes from '../constants/ActionTypes';
import {fetchJson} from '../core/fetch';
import {canUseDOM} from 'exenv';
import jwtDecode from 'jwt-decode';

/* eslint-disable consistent-return */
export function readToken() {
  return function (dispatch) {
    if (canUseDOM) {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        dispatch({
          type: ActionTypes.READ_TOKEN_SUCCESS,
          token,
          username: decoded ? decoded.username : '',
        });
        dispatch({
          type: ActionTypes.AUTHENTICATE_USER_SUCCESS,
        });
      }
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

export function writeAuthorization({token, profile}) {
  return function (dispatch) {
    if (canUseDOM) {
      localStorage.setItem('token', token);
      localStorage.setItem('profile', JSON.stringify(profile));
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
      dispatch(writeAuthorization(json));
      dispatch(readToken());
      return json;
    });
  };
}
