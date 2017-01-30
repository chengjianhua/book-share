/**
 * Created by cjh95414 on 2016/5/6.
 */
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'components/App';
// import SignPage from 'components/SignPage';
import BookCardPage from 'components/BookCardPage';
// import UserPage from 'components/UserPage';
// import UserProfile from 'components/UserProfile';
// import ProfileSettings from 'components/UserProfile/Settings';
// import BookDetailPage from 'components/BookDetailPage';
// import Share from 'components/Share';
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

function getComponent(module) {
  return function (nextState, cb) {
    module.then((component) => {
      cb(null, component);
    });
  };
}

/* eslint-disable import/no-dynamic-require, global-require */
function getComponents(components = {
  main: null,
  header: null,
}) {
  return async function (nextState, cb) {
    const keys = Object.keys(components);
    const lazyModules = keys.map((key) => {
      const module = components[key];

      if (typeof module === 'string') {
        if (__SERVER__) {
          return Promise.resolve(require(`components/${module.replace('components/', '')}`).default);
        }

        return import(`components/${module.replace('components/', '')}`);
      }

      return module;
    });

    const loadedModules = await Promise.all(lazyModules);

    const routes = keys.reduce((obj, key, index) => {
      const module = loadedModules[index];
      obj[key] = module.__esModule ? module.default : module; // eslint-disable-line no-param-reassign, no-underscore-dangle
      return obj;
    }, {});

    console.log(`getComponents(), main: ${routes.main.displayName} header: ${routes.header ? routes.header.displayName : ''}`);

    if ('Header' in components.main) {
      routes.header = components.Header;
    }

    cb(null, routes);
  };
}

const routes = {
  path: '/',
  component: App,
  indexRoute: {
    components: {
      main: BookCardPage,
      header: AppHeader,
    },
  },
  childRoutes: [
    {
      path: 'sign',
      getComponents: getComponents({
        main: 'components/SignPage',
      }),
    },
    {
      path: 'share',
      childRoutes: [
        {
          path: 'add',
          getComponents: getComponents({
            main: 'components/Share',
            header: Promise.resolve(PageHeader),
          }),
        },
        {
          path: 'book/:id',
          getComponents: getComponents({
            main: 'components/BookDetailPage',
          }),
        },
      ],
    },
    {
      path: 'user',
      indexRoute: {
        getComponents: getComponents({
          main: 'components/UserPage',
          header: Promise.resolve(AppHeader),
        }),
      },
      childRoutes: [
        {
          path: 'profile',
          getComponents: getComponents({
            main: 'components/UserProfile',
            header: Promise.resolve(PageHeader),
          }),
        },
        {
          path: 'settings',
          getComponents: getComponents({
            main: 'components/UserProfile/Settings',
            header: Promise.resolve(PageHeader),
          }),
        },
      ],
    },
  ],
};

export default routes;
