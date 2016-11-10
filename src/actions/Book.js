import ActionTypes from '../constants/ActionTypes';
import isomorphicFetch from 'isomorphic-fetch';
import {fetchJson} from '../core/fetch';

import {fromJS} from 'immutable';

import {doubanAPI} from '../config';

const prefix = '/api/share/books';

export function fetchBookList(page) {
  return function (dispatch) {
    dispatch({
      type: ActionTypes.FETCH_BOOK_LIST_DOING,
    });

    return fetchJson(`${prefix}?page=${page}`)
    .then((json) => {
      const {books} = json;

      const promises = [];

      books.forEach(book => {
        if (book.bookId) {
          promises.push(
            isomorphicFetch(`${doubanAPI}/${book.bookId}`, {
              mode: 'cors',
              headers: {
                'Content-Type': 'application/json',
              },
            })
            .then(response => response.json())
            .then(detail => Object.assign({}, book, {detail}))
          );
        } else {
          promises.push(Promise.resolve(book));
        }
      });

      // 将返回带有结果的 Promise 对象添加到数组当中，为了传递给 Promise.all
      Promise.all(promises)
      .then(bookList => {
        dispatch({
          type: ActionTypes.FETCH_BOOK_LIST_SUCCESS,
          data: fromJS(bookList),
          page: bookList.length > 0 ? page + 1 : page,
        });
      });
    })
    .catch(error => {
      dispatch({
        type: ActionTypes.FETCH_BOOK_LIST_FAILURE,
        error,
      });
    });
  };
}

export function fetchBook(bookId) {
  return function (dispatch) {
    dispatch({
      type: ActionTypes.FETCH_BOOK_DOING,
    });

    return fetchJson(`${prefix}/${bookId}`)
      .then(json => {
        const {book} = json;

        return fetchJson(`${doubanAPI}/${book.bookId}`)
        .then(detail => {
          const bookDetail = Object.assign({}, book, {detail});
          dispatch({
            type: ActionTypes.FETCH_BOOK_SUCCESS,
            detail: fromJS(bookDetail),
          });
        });
      });
  };
}

export function addComment(shareId, comment) {
  return function (dispatch) {
    return fetchJson(`${prefix}/${shareId}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
    })
    .then(() => {
      dispatch({
        type: ActionTypes.ADD_COMMENT_SUCCESS,
        data: comment,
      });
    })
    .catch((err) => {
      dispatch({
        type: ActionTypes.ADD_COMMENT_FAILURE,
        err,
      });
    });
  };
}

export const star = (shareId, username) => (dispatch) =>
  fetchJson(`${prefix}/${shareId}/star/${username}`, {
    method: 'POST',
  })
  .then(() => {
    dispatch({
      type: ActionTypes.STAR_SHARE_BOOK_SUCCESS,
    });
  })
  .catch((err) => {
    dispatch({
      type: ActionTypes.STAR_SHARE_BOOK_FAILURE,
      err,
    });
  });

export const unstar = (shareId, username) => (dispatch) => {
  dispatch({
    type: ActionTypes.STAR_BOOK_DOING,
  });

  return fetchJson(`${prefix}/${shareId}/star/${username}`, {
    method: 'DELETE',
  })
  .then(() => {
    dispatch({
      type: ActionTypes.STAR_BOOK_SUCCESS,
    });
  })
  .catch((err) => {
    dispatch({
      type: ActionTypes.STAR_BOOK_FAILURE,
      err,
    });
  });
};
