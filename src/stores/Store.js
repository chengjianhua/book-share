import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import reducers from '../reducers';

export default createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    typeof window !== 'undefined' && window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
