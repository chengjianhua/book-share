/**
 * Created by cjh95414 on 2016/5/6.
 */

//noinspection JSUnresolvedVariable
import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from '../components/App/App';
import LoginPage from '../components/LoginPage';
import BookCardPage from '../components/BookCardPage';
import ProfilePage from '../components/ProfilePage';
import BookDetail from '../components/BookDetail';

import AppHeader from '../components/AppHeader';
import PageHeader from '../components/PageHeader';


/**
 * 必须指定参数 props，且在 <App /> 中写上 {...props} 不然路由时，children属性传递不到 <App />组件中
 * @param props
 * @constructor
 */
const AppIndex = (props)=> (
  <App header={<AppHeader />} {...props} />
);

const AppPage = (props)=>(
  <App header={<PageHeader />} {...props} />
);

export default ([
  <Route path="/" component={AppIndex}>
    <IndexRoute component={BookCardPage}/>
    <Route path="login" component={LoginPage}/>
    <Route path="me" component={ProfilePage}/>

  </Route>,
  <Route path="share" component={AppPage}>
    <Route path="book" component={BookDetail}>

    </Route>
  </Route>
]);
