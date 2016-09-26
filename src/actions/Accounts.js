import ActionTypes from '../constants/ActionTypes';
// import isomorphicFetch from 'isomorphic-fetch';
import fetch, {fetchJson} from '../core/fetch';

import {fromJS} from 'immutable';

import {doubanAPI} from '../config';

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
