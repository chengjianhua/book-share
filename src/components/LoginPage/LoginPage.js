/**
 * Created by Cheng jianhua at 11:10 on 2016/6/6
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';

import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './LoginPage.scss';

import {authenticate} from '../../actions/Auth';

class LoginPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      openAlertDialog: false,
    };
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {actions} = this.props;
    const {username, password} = this.state;

    actions.authenticate(username, password)
    .then(() => {
      this.setState({
        openAlertDialog: true,
      }, () => {
        setTimeout(() => {
          this.form.submit();
        }, 2000);
      });
    });
  };

  handleUsernameChange = (event, value) => {
    event.stopPropagation();

    this.setState({
      username: value,
    });
  };

  handlePasswordChange = (event, value) => {
    event.stopPropagation();

    this.setState({
      password: value,
    });
  };

  render() {
    const {username, password, openAlertDialog} = this.state;
    const {originalUrl} = this.props;

    return (
      <div className={s.root}>
        <form
          ref={(ref) => {this.form = ref;}}
          method="post"
          action={`/manage/authenticate?url=${originalUrl}`}
          onSubmit={this.handleFormSubmit}
        >
          <TextField
            fullWidth
            key="login-username"
            name="username"
            id="login-username"
            hintText="请输入您的用户名"
            value={username}
            onChange={this.handleUsernameChange}
          />

          <TextField
            fullWidth
            key="login-password"
            name="password"
            id="login-username"
            hintText="请输入您的密码"
            type="password"
            value={password}
            onChange={this.handlePasswordChange}
          />

          <RaisedButton
            key="login-button"
            primary
            label="登录"
            type="submit"
            style={{width: '100%'}}
          />
        </form>

        <Dialog
          key="submitResult"
          modal={false}
          open={openAlertDialog}
        >
          您已登录成功，用户名为[{username}]，即将跳转到主页.
        </Dialog>
      </div>
    );
  }

}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, {authenticate}), dispatch),
  };
}

export default connect(null, mapDispatchToProps)(withStyles(s)(withRouter(LoginPage)));
