import ActionTypes from 'ActionTypes';
import { Map, List } from 'immutable';

const defaultState = new Map({
  bookSearchResult: new List(),
});

function share(state = defaultState, { type, data }) {
  switch (type) {
    case ActionTypes.SEARCH_BOOK_SUCCESS:
      return state.set('bookSearchResult', data);
    default:
      return state;
  }
}

export default share;
