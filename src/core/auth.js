/**
 * Created by cjh95414 on 2016/6/15.
 */

import fetch from 'isomorphic-fetch'
import 'es6-promise';

const sessionStorage = typeof window !== 'undefined' ? window.sessionStorage : null;

const USER = 'user';

console.log(sessionStorage);

const auth = {

  login(username, password, callback) {
    callback = arguments[arguments.length - 1];

    let user = sessionStorage.getItem(USER);

    console.log('typeof user' + typeof user);
    // 如果用户已经登录了，则不请求，直接 return 跳出函数体的执行
    if (user && user != 'undefined' && user != 'null') {
      if (callback) callback(true);
      return 1;
    }

    // 将传入的用户名、密码传递到服务器进行验证，并在 then 中对服务器返回的数据进行处理
    requestForAuthentication(username, password).then(function (res) {
      // 验证成功的话则将数用户数据存储到 sessionStorage 并执行传入 login 的 callback 函数
      if (res.authenticated) {
        sessionStorage.setItem(USER, JSON.stringify(res.user));
        callback && callback(true);
      } else {
        callback && callback(false);
      }

    });

  },

  logout(callback) {
    sessionStorage.removeItem(USER);
    callback && callback();
  },

  getUser() {
    return sessionStorage.getItem(USER);
  },

  isAuthenticated() {
    return sessionStorage && !!sessionStorage.getItem(USER);
  },

};

function requestForAuthentication(username, password) {

  // 将要传递到服务器验证的用户名、密码
  const postData = {username, password};

  return (

    fetch(`/manage/login`, {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json"
      },
    }).then(function (response) {
      return response.json();
    }).then(function (data) {

      console.log(data);

      return {
        authenticated: data.isSuccess,
        token: data.token,
        user: data.user
      };

    }).catch(function (ex) {
      console.warn('登录操作失败!', ex);
    })
  );

}

export default auth;
