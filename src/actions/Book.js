import ActionTypes from '../constants/ActionTypes';
import fetch from 'isomorphic-fetch';

import {fromJS} from 'immutable';

import {doubanAPI} from '../config';

export function fetchBookList(page) {
  return function (dispatch) {
    dispatch({
      type: ActionTypes.FETCH_BOOK_LIST_DOING,
    });

    return fetch(`/api/share/books?page=${page}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((json) => {
      const {books} = json;

      // 将返回带有结果的 Promise 对象添加到数组当中，为了传递给 Promise.all
      Promise.all(books.map(
        book => fetch(`${doubanAPI}/${book.bookId}`, {
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(response => response.json())
        .then(detail => Object.assign({}, book, {detail}))
      ))
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
    return fetch(`/api/share/book/${bookId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(json => {
      const {book} = json;
      fetch(`${doubanAPI}/${bookId}`)
      .then(response => response.json())
      .then(detail => {
        const bookDetail = Object.assign({}, book, {detail});
        dispatch({
          type: ActionTypes.FETCH_BOOK_SUCCESS,
          data: fromJS(bookDetail),
        });
      });
    });
  };
}

export function addComment(shareId, comment) {
  return function (dispatch) {
    return fetch(`/manage/comment/add/${shareId}`, {
      method: 'POST',
      body: JSON.stringify(comment),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
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
