/**
 * Created by cjh95414 on 2016/5/6.
 */

import React from 'react';
import {Route, Link, IndexRoute} from 'react-router';
import fetch from '../core/fetch';
import App from '../components/App/App';
// import s from '../components/App/App.scss';
import ContactPage from '../components/ContactPage';
import LoginPage from '../components/LoginPage';
import BookCardPage from '../components/BookCardPage';


class ContentWrapper extends React.Component {

  render() {

    const query = `/graphql?query={content(path:"${state.path}"){path,title,content,component}}`;
    // const response = await fetch(query);
    const response = fetch(query);
    // const {data} = await response.json();

    return (
      <ContactPage {... data.content} />
    );
  }
}

export default (
  <Route path="/" component={App}>
    <IndexRoute component={BookCardPage}/>
    <Route path="login" component={LoginPage}/>
    <Route path="me" component={BookCardPage}/>
  </Route>
);
