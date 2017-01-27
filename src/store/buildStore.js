import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from '../reducers';

const buildStore = (initialState = {}) => {
  const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(
      applyMiddleware(thunk),
    )
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducers = require('../reducers/index').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducers);
    });
  }

  return store;
};

export default buildStore;
