/**
 * Created by cjh95414 on 2016/5/6.
 */
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'components/App';
import SignPage from 'components/SignPage';
import BookCardPage from 'components/BookCardPage';
import UserPage from 'components/UserPage';
import UserProfile from 'components/UserProfile';
import ProfileSettings from 'components/UserProfile/Settings';
import BookDetailPage from 'components/BookDetailPage';
import Share from 'components/Share';
import AppHeader from 'components/AppHeader';
import PageHeader from 'components/PageHeader';

import buildStore from '../store/buildStore';

const store = buildStore();

/**
 * @description 如果用户没有登录则重定向到登录页面
 * @param nextState
 * @param replace
 */
function redirectToLogin(nextState, replace) {
  const token = store.getState().auth.get('token');
  if (!token) {
      // 重定向到登录页面
    replace({
      pathname: '/sign',
      state: { nextPathname: nextState.location.pathname },
    });
  }
}

export default ([
  <Route path="/" component={App}>

    <IndexRoute components={{ main: BookCardPage, header: AppHeader }} />

    <Route path="sign" components={{ main: SignPage }} />

    <Route path="share">
      <Route path="add" components={{ main: Share, header: PageHeader }} />
      <Route path="book/:id" components={{ main: BookDetailPage, header: BookDetailPage.Header }} />
    </Route>

    <Route path="user">
      <IndexRoute components={{ main: UserPage, header: AppHeader }} />
      <Route path="profile" components={{ main: UserProfile, header: PageHeader }} />
      <Route path="settings" components={{ main: ProfileSettings, header: PageHeader }} />
    </Route>
  </Route>,
]);
