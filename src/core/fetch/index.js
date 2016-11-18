import isomorphicFetch from 'isomorphic-fetch';
import {canUseDOM} from 'exenv';

/* eslint-disable no-param-reassign */
/* eslint-disable no-else-return */

function addAuthorizationHeader(options) {
  let token = '';
  if (canUseDOM) {
    token = localStorage.getItem('token');
  }
  const authenticationHeader = {
    ['Authorization']: `Bearer ${token}`,
  };

  const headers = Object.assign({}, options.headers, authenticationHeader);

  return Object.assign({}, options, {headers});
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
  const finalOptions = addAuthorizationHeader(options);
  return isomorphicFetch(url, finalOptions)
    .then(checkStatus)
    .then(parseJson);
}

function addContentTypeJson(options) {
  const addedHeaders = {
    'Content-Type': 'application/json',
  };

  const headers = Object.assign({}, options.headers, addedHeaders);

  return Object.assign({}, options, {
    method: 'POST',
    headers,
  });
}

function fetchJson(url, options = {}) {
  const finalOptions = addAuthorizationHeader(options);
  return isomorphicFetch(url, finalOptions)
    .then(checkStatus)
    .then(parseJson);
}

function postJson(url, options = {}) {
  const finalOptions = addAuthorizationHeader(addContentTypeJson(options));
  return isomorphicFetch(url, finalOptions)
    .then(checkStatus)
    .then(parseJson);
}

export default fetch;

export {
  fetchJson,
  postJson,
};
