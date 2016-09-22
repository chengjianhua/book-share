import ActionTypes from '../constants/ActionTypes';
import fetch from 'isomorphic-fetch';

import {fromJS} from 'immutable';

import {doubanAPI} from '../config';

export function fetchUserBooks(username) {
  return function (dispatch) {
    dispatch({
      type: ActionTypes.FETCH_USER_BOOKS_DOING,
    });
    fetch(`/api/accounts/${username}/books`)
    .then(response => response.json())
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
