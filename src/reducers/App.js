import {Map} from 'immutable';
// import ActionTypes from 'ActionTypes';

const defaultState = new Map({
  isLoading: false,
});

/* eslint-disable no-else-return */
function app(state = defaultState, action) {
  switch (action.type) {

    default: {
      if (action.type.indexOf('DOING') > -1) {
        return state.set('isLoading', true);
      } else {
        return state.set('isLoading', false);
      }
    }
  }
}

export default app;
