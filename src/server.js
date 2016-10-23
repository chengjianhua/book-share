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

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import schema from './data/schema';
import assets from './assets';
import {port, auth} from './config';
import mongodbConnect from './database/db';

import React from 'react';
import {renderToString} from 'react-dom/server';
import {match, RouterContext} from 'react-router';
import routes from './router/routes';

import {Provider} from 'react-redux';
import buildStore from './store/buildStore';

import indexRouter from './controller/index';
import apiRouter from './controller/api';
import testRouter from './controller/test';
import passport from './core/passport';

import WithStylesContext from './components/WithStylesContext';

const server = global.server = express();
const MongoStore = require('connect-mongo')(session);

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
server.use(compress());
server.use(express.static(path.join(__dirname, 'public')));
server.enable('trust proxy');
server.use(cookieParser(auth.session.secret));
server.use(bodyParser.urlencoded({extended: true}));
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
  rootValue: {request: req},
  pretty: process.env.NODE_ENV !== 'production',
})));

//
// Authentication
// -----------------------------------------------------------------------------
server.use(session({
  secret: auth.session.secret,
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({dbPromise: mongodbConnect}),
}));
server.use(passport.initialize());
server.use(passport.session());
server.use(passport.loggerMiddleware());
server.use(passport.authenticateMiddleware().unless({
  useOriginalUrl: false,
  path: ['/', '/sign', '/manage/authenticate'],
}));

server.get('*', (req, res) => {
  match({routes, location: req.url}, (err, redirectLocation, renderProps) => {
    const template = require('./views/index.jade');
    const css = [];
    const store = buildStore();

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
      const muiTheme = getMuiTheme({userAgent: req.headers['user-agent']});
      global.navigator = {
        userAgent: req.headers['user-agent'],
      };

      data.body = renderToString(
        <Provider store={store}>
          <WithStylesContext onInsertCss={styles => css.push(styles._getCss())}>
            <MuiThemeProvider muiTheme={muiTheme}>
              <RouterContext {...renderProps} />
            </MuiThemeProvider>
          </WithStylesContext>
        </Provider>
      );

      data.css = css.join('');

      res.status(200).send(template(data));
    } else {
      res.status(404).send('Not found');
    }
  });
});
server.use('/manage', indexRouter);
server.use('/test', testRouter);

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.log(pe.render(err)); // eslint-disable-line no-console
  const template = require('./views/error.jade');
  const statusCode = err.status || 500;
  res.status(statusCode);
  res.send(template({
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
