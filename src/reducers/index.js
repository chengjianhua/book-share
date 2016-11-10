import {combineReducers} from 'redux';

import book from './Book';
import accounts from './Accounts';
import auth from './Auth';
import app from './App';

const reducers = combineReducers({
  book, accounts, auth, app,
});

export default reducers;
