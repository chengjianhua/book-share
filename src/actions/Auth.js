import ActionTypes from 'ActionTypes';
import {fetchJson} from '../core/fetch';
import {canUseDOM} from 'exenv';
import jwtDecode from 'jwt-decode';
import {fromJS} from 'immutable';

/* eslint-disable consistent-return */
export function readToken() {
  return function (dispatch) {
    if (canUseDOM) {
      const token = localStorage.getItem('token');
      const profile = JSON.parse(localStorage.getItem('profile'));
      if (token) {
        const decoded = jwtDecode(token);
        dispatch({
          type: ActionTypes.READ_TOKEN_SUCCESS,
          token,
          username: decoded ? decoded.username : '',
          profile: fromJS(profile),
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
      localStorage.removeItem('profile');
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
      // localStorage.setItem('profile', JSON.stringify(profile));
      localStorage.setItem('profile', JSON.stringify(jwtDecode(token).profile));
      dispatch({
        token,
        type: ActionTypes.WRITE_TOKEN_SUCCESS,
      });
    }
  };
}

export function authenticate(username, password) {
  return function (dispatch) {
    return fetchJson('/api/token', {
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
