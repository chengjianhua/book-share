import {List, Map} from 'immutable';

import ActionTypes from 'ActionTypes';

const defaultState = new Map({
  bookList: new Map({
    isLoading: true,
    data: new List(),
    page: 1,
  }),
  book: new Map({
    starred: false,
    detail: new Map(),
  }),
});

function fetchBookList(state, action) {
  switch (action.type) {
    case ActionTypes.FETCH_BOOK_LIST_SUCCESS:
      return state.setIn(['bookList', 'data'],
          state.getIn(['bookList', 'data']).concat(action.data))
            .setIn(['bookList', 'page'], action.page)
            .setIn(['bookList', 'isLoading'], false);
    default:
      return state;
  }
}

function fetchBook(state, action) {
  switch (action.type) {
    // case ActionTypes.FETCH_BOOK_DOING:
    case ActionTypes.FETCH_BOOK_SUCCESS:
      return state.setIn(['book', 'detail'], action.detail);
    // case ActionTypes.FETCH_BOOK_FAILURE:
    default:
      return state;
  }
}

function addComment(state, action) {
  switch (action.type) {
    case ActionTypes.ADD_COMMENT_SUCCESS:
      return state.setIn(['book', 'comments'],
        state.getIn(['book', 'comments']).push(action.data));
    default:
      return state;
  }
}

function starAndUnstar(state, action) {
  switch (action.type) {
    case ActionTypes.STAR_BOOK_SUCCESS:
      return state.setIn(['book', 'starred'], true);
    case ActionTypes.UNSTAR_BOOK_SUCCESS:
      return state.setIn(['book', 'starred'], false);
    default:
      return state;
  }
}

export default function book(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.FETCH_BOOK_LIST_DOING:
    case ActionTypes.FETCH_BOOK_LIST_SUCCESS:
    case ActionTypes.FETCH_BOOK_LIST_FAILURE:
      return fetchBookList(state, action);
    case ActionTypes.ADD_COMMENT_SUCCESS:
      return addComment(state, action);
    case ActionTypes.FETCH_BOOK_DOING:
    case ActionTypes.FETCH_BOOK_SUCCESS:
    case ActionTypes.FETCH_BOOK_FAILURE:
      return fetchBook(state, action);
    case ActionTypes.STAR_BOOK_SUCCESS:
    case ActionTypes.UNSTAR_BOOK_SUCCESS:
      return starAndUnstar(state, action);
    default:
      return state;
  }
}
