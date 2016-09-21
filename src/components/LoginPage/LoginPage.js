/**
 * Created by Cheng jianhua at 11:10 on 2016/6/6
 */
import React, {Component, PropTypes} from 'react';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './LoginPage.scss';

import auth from '../../core/auth';

class LoginPage extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

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

    const {username, password} = this.state;
    auth.login(username, password, (isLoggedIn) => {
      // 如果登录成功则执行以下操作
      if (isLoggedIn) {
        // 打开成功的提示弹窗并在定时时间后自动跳转到主页
        this.setState({
          openAlertDialog: true,
        }, () => {
          setTimeout(() => {
            this.context.router.push('/');
          }, 2000);
        });
      }
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
    return (
      <div className={s.root}>

        <form method="post" action="" onSubmit={this.handleFormSubmit}>
          <TextField
            key="login-username"
            hintText="请输入您的用户名"
            fullWidth
            value={username}
            onChange={this.handleUsernameChange}
          />

          <TextField
            key="login-password"
            fullWidth
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

export default withStyles(s)(LoginPage);
