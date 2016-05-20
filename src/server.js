/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import 'babel-polyfill';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressJwt from 'express-jwt';
import expressGraphQL from 'express-graphql';
import jwt from 'jsonwebtoken';
import fetch from './core/fetch';
import {renderToString} from 'react-dom/server';
import PrettyError from 'pretty-error';
import passport from './core/passport';
import schema from './data/schema';
// import Router from './routes';
import assets from './assets';
import {port, auth, analytics} from './config';

import React from 'react';
import routes from './router/routes';
import {match, RouterContext} from 'react-router';

import WithStylesContext from "./components/WithStylesContext";

const server = global.server = express();

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
server.use(express.static(path.join(__dirname, 'public')));
server.use(cookieParser());
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

//
// Authentication
// -----------------------------------------------------------------------------
server.use(expressJwt({
  secret: auth.jwt.secret,
  credentialsRequired: false,
  /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
  getToken: req => req.cookies.id_token,
  /* jscs:enable requireCamelCaseOrUpperCaseIdentifiers */
}));
server.use(passport.initialize());

server.get('/login/facebook',
  passport.authenticate('facebook', {scope: ['email', 'user_location'], session: false})
);
server.get('/login/facebook/return',
  passport.authenticate('facebook', {failureRedirect: '/login', session: false}),
  (req, res) => {
    const expiresIn = 60 * 60 * 24 * 180; // 180 days
    const token = jwt.sign(req.user, auth.jwt.secret, {expiresIn});
    res.cookie('id_token', token, {maxAge: 1000 * expiresIn, httpOnly: true});
    res.redirect('/');
  }
);

//
// Register API middleware
// -----------------------------------------------------------------------------
server.use('/graphql', expressGraphQL(req => ({
  schema,
  graphiql: true,
  rootValue: {request: req},
  pretty: process.env.NODE_ENV !== 'production',
})));

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
/*server.get('*', async(req, res, next) => {
 try {
 let statusCode = 200;
 const template = require('./views/index.jade');
 const data = {title: '', description: '', css: '', body: '', entry: assets.main.js};

 if (process.env.NODE_ENV === 'production') {
 data.trackingId = analytics.google.trackingId;
 }

 const css = [];
 const context = {
 insertCss: styles => css.push(styles._getCss()),
 onSetTitle: value => (data.title = value),
 onSetMeta: (key, value) => (data[key] = value),
 onPageNotFound: () => (statusCode = 404),
 };

 console.dir(`Server Render ${Router}`);

 await Router.dispatch({path: req.path, query: req.query, context}, (state, component) => {
 data.body = ReactDOM.renderToString(component);
 data.css = css.join('');
 });

 res.status(statusCode);
 res.send(template(data));
 } catch (err) {
 next(err);
 }
 });*/

server.get('*', (req, res) => {

  match({routes, location: req.url}, (err, redirectLocation, renderProps) => {

    console.log("Starting to render the react router!");

    const template = require('./views/index.jade');
    const data = {title: '', description: '', css: '', body: '', entry: assets.main.js};

    if (err) {

      res.status(500).send(err.message);
    } else if (redirectLocation) {

      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps || true) {

      const css = [];
      //noinspection JSCheckFunctionSignatures
      data.body = renderToString(
        <WithStylesContext onInsertCss={styles => css.push(styles._getCss())}>
          <RouterContext {...renderProps} />
        </WithStylesContext>);

      // data.body = '';

      res.status(200).send(template(data));
    } else {

      res.status(404).send('Not found');
    }
  }); // ~match

});

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
