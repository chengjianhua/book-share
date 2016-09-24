import {combineReducers} from 'redux';

import book from './Book';
import accounts from './Accounts';
import auth from './Auth';

const reducers = combineReducers({
  book, accounts, auth,
});

export default reducers;
