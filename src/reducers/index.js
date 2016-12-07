import { combineReducers } from 'redux';

import book from './Book';
import accounts from './Accounts';
import auth from './Auth';
import app from './App';
import share from './Share';

const reducers = combineReducers({
  book, accounts, auth, app, share,
});

export default reducers;
