/**
 * Created by cjh95414 on 2016/6/6.
 */
import unless from 'express-unless';
import log4js from 'log4js';
import passport from 'passport';
import LocalStrategy from 'passport-local';

import User from '../model/User';

const logger = log4js.getLogger('passport');

/* eslint-disable no-console */
passport.use(new LocalStrategy((username, password, done) => {
  User.findUniqueUserByUsername(username, (err, user) => {
    if (err) {
      console.log('出现错误.');
      return done(err);
    }
    if (!user) {
      console.log('没有找到对应的用户名.');
      return done(null, false, {message: '没有找到对应的用户名.'});
    }
    if (user.password !== password) {
      console.log('密码匹配有误.');
      return done(null, false, {message: '密码匹配有误.'});
    }

    return done(null, user);
  });
}));

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser((username, done) => {
  User.findUniqueUserByUsername(username, (err, user) => {
    if (err) {
      return done(err);
    }
    return done(null, user);
  });
});

passport.authenticateMiddleware = () => {
  const middleware = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.redirect('/sign');
  };

  middleware.unless = unless;
  return middleware;
};

passport.loggerMiddleware = () => (req, res, next) => {
  logger.debug(`username ${req.user ? req.user.username : null} has found in session.`);
  next();
};

export default passport;
