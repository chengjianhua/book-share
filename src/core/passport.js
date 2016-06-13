/**
 * Created by cjh95414 on 2016/6/6.
 */

import passport from 'passport';
import LocalStrategy from 'passport-local';

import User from '../model/User';

passport.use(new LocalStrategy(
  function (username, password, done) {
    User.findUniqueUserByUsername(username, function (err, user) {

      if (err) {
        console.log('出现错误.');
        return done(err);
      }
      if (!user) {
        console.log('没有找到对应的用户名.');

        return done(null, false, {message: '没有找到对应的用户名.'});
      }
      if (user.password != password) {
        console.log('密码匹配有误.');

        return done(null, false, {message: '密码匹配有误.'});
      }

      return done(null, user);
    });
  }
));


passport.serializeUser(function (user, done) {
  done(null, user.username);
});

passport.deserializeUser(function (username, done) {
  User.findUniqueUserByUsername(username, function (err, user) {
    if (err) {
      return done(err);
    }
    done(null, user);
  });
});

export default passport;
