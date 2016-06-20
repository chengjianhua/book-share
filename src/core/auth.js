/**
 * Created by cjh95414 on 2016/6/15.
 */

import fetch from 'isomorphic-fetch'
import 'es6-promise';

const sessionStorage = typeof window !== 'undefined' ? window.sessionStorage : null;

const user = 'user';

console.log(sessionStorage);

const auth = {

  login(user, cb) {
    cb = arguments[arguments.length - 1];

    if (sessionStorage.getItem('user')) {
      if (cb) cb(true);
      this.onChange(true);
    }

  },

  getToken() {
    return sessionStorage.token
  },

  logout(cb) {
    delete sessionStorage.token;
    if (cb) cb();
    this.onChange(false)
  },

  isAuthenticated() {
    return !!sessionStorage.token
  },

  onChange() {
  }
};

function pretendRequest(email, pass, cb) {
  setTimeout(() => {
    if (email === 'joe@example.com' && pass === 'password1') {
      cb({
        authenticated: true,
        token: Math.random().toString(36).substring(7)
      })
    } else {
      cb({authenticated: false})
    }
  }, 0)
}

export default auth;
