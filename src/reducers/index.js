import {combineReducers} from 'redux';

import book from './Book';
import accounts from './Accounts';

const reducers = combineReducers({
  book, accounts,
});

export default reducers;
