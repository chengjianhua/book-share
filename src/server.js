import 'babel-polyfill';
import path from 'path';
import cors from 'cors';
import compress from 'compression';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressGraphQL from 'express-graphql';
import session from 'express-session';
import morgan from 'morgan';
import PrettyError from 'pretty-error';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import schema from './data/schema';
import assets from './assets'; // eslint-disable-line import/no-unresolved
import { port, auth } from './config';
import mongodbConnect from './database/db';

import routes from './router/routes';

import buildStore from './store/buildStore';

import indexRouter from './controller/index';
import apiRouter from './controller/api';
import passport from './core/passport';

import WithStylesContext from './components/WithStylesContext';

import templateIndex from './views/index.jade';
import templateError from './views/error.jade';

const server = global.server = express();
const MongoStore = require('connect-mongo')(session);

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
server.use(compress());
server.use(express.static(path.join(__dirname, 'public')));
server.enable('trust proxy');
server.use(cookieParser(auth.session.secret));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cors());

/**
 *
 * Tool middlewares
 */
server.use(morgan('dev'));

//
// Register API middleware
// -----------------------------------------------------------------------------
// api don't need to be check cookie.
server.use('/api', apiRouter);
server.use('/graphql', expressGraphQL(req => ({
  schema,
  graphiql: true,
  rootValue: { request: req },
  pretty: process.env.NODE_ENV !== 'production',
})));

//
// Authentication
// -----------------------------------------------------------------------------
server.use(session({
  secret: auth.session.secret,
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({ dbPromise: mongodbConnect }),
}));
server.use(passport.initialize());
server.use(passport.session());
server.use(passport.loggerMiddleware());
server.use(passport.authenticateMiddleware().unless({
  useOriginalUrl: false,
  path: [
    '/', '/sign', '/manage/login', '/manage/register', '/manage/checkUsername',
  ],
}));

server.get('*', (req, res) => {
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    const css = [];

    const initState = buildStore().getState();

    // 如果用户已经登录就将其中的用户信息保存到 store 中
    if (req.user) {
      const { username, ...profile } = req.user;
      initState.auth = fromJS({
        isAuthenticated: true,
        token: null,
        username,
        profile,
      });
    }

    const store = buildStore(initState);

    const data = {
      title: '图书分享',
      description: '',
      css: '',
      body: '',
      entry: assets.main.js,
    };

    if (err) {
      res.status(500).send(err.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const muiTheme = getMuiTheme({ userAgent: req.headers['user-agent'] });
      global.navigator = {
        userAgent: req.headers['user-agent'],
      };

      /* eslint-disable no-underscore-dangle */
      data.body = renderToString(
        <WithStylesContext onInsertCss={styles => css.push(styles._getCss())}>
          <Provider store={store}>
            <MuiThemeProvider muiTheme={muiTheme}>
              <RouterContext {...renderProps} />
            </MuiThemeProvider>
          </Provider>
        </WithStylesContext>,
      );

      data.css = css.join('');

      res.status(200).send(templateIndex(data));
    } else {
      res.status(404).send('Not found');
    }
  });
});
server.use('/manage', indexRouter);

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.log(pe.render(err)); // eslint-disable-line no-console
  const statusCode = err.status || 500;
  res.status(statusCode);
  res.send(templateError({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '' : err.stack,
  }));
});

//
// Launch the server
// -----------------------------------------------------------------------------
server.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`The server is running at http://localhost:${port}/`);
});

process.on('unhandledRejection', (err) => {
  console.error('unhandledRejection watched by server.js:');
  console.error(err);
});
