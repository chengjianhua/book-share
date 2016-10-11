import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import reducers from '../reducers';

const buildStore = (initialState = {}) => createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(thunk),
    typeof window !== 'undefined' && window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default buildStore;
