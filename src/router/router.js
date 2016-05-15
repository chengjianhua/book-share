/**
 * Created by cjh95414 on 2016/5/6.
 */

import React from 'react';
import {Router, Route, Link, IndexRoute} from 'react-router';
import fetch from '../core/fetch';
import App from '../components/App';
import ContentPage from '../components/ContentPage';
import ContactPage from '../components/ContactPage';
import LoginPage from '../components/LoginPage';
import RegisterPage from '../components/RegisterPage';
import NotFoundPage from '../components/NotFoundPage';
import ErrorPage from '../components/ErrorPage';
import BookCardPage from '../components/BookCardPage';


class ContentWrapper extends React.Component {


  constructor (props) {
    super(props);
  }

  render () {

    const query = `/graphql?query={content(path:"${state.path}"){path,title,content,component}}`;
    // const response = await fetch(query);
    const  response = fetch(query);
    // const {data} = await response.json();

    return (
      <ContactPage {... data.content} />
    );
  }
}

class Routes extends React.Component {

  render() {
    return (
      <Route path="/" component={<App name = "sdf"/>}>
        <IndexRoute component={BookCardPage}/>

        <Route path="/about" component={ContactPage}/>

      </Route>
    );
  }
}

export default Routes;
