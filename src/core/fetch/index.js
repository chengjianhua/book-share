import isomorphicFetch from 'isomorphic-fetch';
import {canUseDOM} from 'exenv';

/* eslint-disable no-param-reassign */
/* eslint-disable no-else-return */

function addAuthorizationHeader(options) {
  const {headers} = options;
  let token = '';
  if (canUseDOM) {
    token = localStorage.getItem('token');
  }
  const authenticationHeader = {
    ['Authorization']: `Bearer ${token}`,
  };

  if (!headers) {
    options.headers = authenticationHeader;
  } else {
    options.headers = Object.assign({}, headers, authenticationHeader);
  }
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function parseJson(response) {
  return response.json();
}

function fetch(url, options = {}) {
  addAuthorizationHeader(options);
  return isomorphicFetch(url, options)
    .then(checkStatus)
    .then(parseJson);
}

function fetchJson(url, options = {}) {
  addAuthorizationHeader(options);
  return isomorphicFetch(url, options)
    .then(checkStatus)
    .then(parseJson);
}

export default fetch;

export {
  fetchJson,
};
