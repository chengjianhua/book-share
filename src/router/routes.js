/**
 * Created by cjh95414 on 2016/5/6.
 */

//noinspection JSUnresolvedVariable
import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from '../components/App/App';
import LoginPage from '../components/LoginPage';
import BookCardPage from '../components/BookCardPage';
import ProfilePage from '../components/ProfilePage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={BookCardPage}/>
    <Route path="login" component={LoginPage}/>
    <Route path="me" component={ProfilePage}/>
  </Route>
);
