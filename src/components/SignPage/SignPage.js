/**
 * Created by cjh95414 on 2016/5/3.
 */

import React, {PropTypes, Component} from 'react';
import {findDOMNode} from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ActionSearch from 'material-ui/svg-icons/action/search';
import Dialog from 'material-ui/Dialog';

import  {Tab, Tabs} from 'material-ui/Tabs';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {darkBlack, lightBlack} from 'material-ui/styles/colors';

import {ListItem} from 'material-ui/List';

import SelectableList from '../common/SelectableList';
import BookCard from '../BookCard';

import LoginPage from '../LoginPage';
import RegisterPage from '../RegisterPage';

//noinspection NpmUsedModulesInstalled
import 'es6-promise';
//noinspection NpmUsedModulesInstalled
import fetch from 'isomorphic-fetch';

import s from './SignPage.scss';


class SignPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tab: 0,
      openAlertDialog: false
    };
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  };


  // an alert dialog that remind user who have post submit successfully.
  handleOpenAlertDialog = () => {
    this.setState({
      openAlertDialog: true
    });

    // 2000ms later, the view switched to homepage.
    setTimeout(function () {
      this.context.router.push('/');
    }.bind(this), 2000);
  };

  /**
   * 点击标签的时候切换到对应的标签
   * @param value
   */
  handleTabChange = (value) => {
    this.setState({
      tab: value
    });
  };

  render() {

    console.log('进入登录/注册页面！');

    return (
      <div>

        <Tabs
          value={this.state.tab}
          onChange={this.handleTabChange}
        >
          <Tab
            value={0}
            label="登录"
          >
            <LoginPage />
          </Tab>

          <Tab
            value={1}
            label="注册"
          >
            <RegisterPage />
          </Tab>

        </Tabs>

      </div>
    );
  }
}

export default withStyles(s)(SignPage);
