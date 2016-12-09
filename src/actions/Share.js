import { fromJS } from 'immutable';

import ActionTypes from 'ActionTypes';

import fetch, { postJson } from '../core/fetch';
import { doubanAPI } from '../config';

const prefix = '/api/share/books';

/**
 * create [新增一个图书分享]
 */
export const create = () => (dispatch) => {
  dispatch({
    type: ActionTypes.CREATE_BOOK_DOING,
  });

  return postJson(prefix)
    .then(({ data }) => {
      dispatch({
        type: ActionTypes.CREATE_BOOK_SUCCESS,
        data,
      });
    })
    .catch((error) => {
      dispatch({
        type: ActionTypes.CREATE_BOOK_FAILURE,
        error,
      });
    });
};

export const searchFromDouban = searchText => (dispatch) => {
  dispatch({
    type: ActionTypes.SEARCH_BOOK_DOING,
  });

  return fetch(`${doubanAPI}/search?q=${searchText}`, {
    mode: 'cors',
  })
    .then((json) => {
      const { msg, books } = json;
      if (msg) {
        throw new Error('Request for books informations failed.');
      }

      dispatch({
        type: ActionTypes.SEARCH_BOOK_SUCCESS,
        data: fromJS(books),
      });
    })
    .catch((error) => {
      dispatch({
        type: ActionTypes.SEARCH_BOOK_FAILURE,
        error,
      });
    });
};
