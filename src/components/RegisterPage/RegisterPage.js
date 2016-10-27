import React, {Component} from 'react';
import {withRouter} from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import s from './RegisterPage.scss';

import fetch from 'isomorphic-fetch';
import 'es6-promise';

class RegisterPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      openAlertDialog: false,
    };
  }

  handleRegisterSubmit = (event) => {
    event.preventDefault();

    const postData = {
      username: this.state.username,
      password: this.state.password,
    };

    console.log('注册表单已被拦截！');

    // noinspection JSUnresolvedFunction
    fetch('/manage/register', {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      // If server return a message that indicates the submit is successful, then switching to homepage.
      if (data.isSuccess) {
        // 打开成功的提示弹窗并在定时时间后自动跳转到主页
        this.setState({
          openAlertDialog: true,
        }, function () {
          setTimeout(function () {
            this.context.router.push('/');
          }.bind(this), 2000);
        });
      }
    }.bind(this)).catch(function (ex) {
      console.log('提交分享表单失败', ex);
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
    return (
      <div className={s.root}>
        <form method="post" action="" onSubmit={this.handleRegisterSubmit}>
          <TextField
            fullWidth
            floatingLabelFixed
            key="register-username"
            name="username"
            id="register-username"
            floatingLabelText="用户名"
            hintText="不超过16位字符"
            value={this.state.username}
            onChange={this.handleUsernameChange}
          />
          <TextField
            fullWidth
            floatingLabelFixed
            key="register-password"
            name="password"
            id="register-password"
            type="password"
            floatingLabelText="密码"
            hintText="不超过16位字符"
            vale={this.state.password}
            onChange={this.handlePasswordChange}
          />

          <RaisedButton
            key="register-button"
            label="注册"
            primary
            type="submit"
            style={{width: '100%', marginTop: '1rem'}}
          />
        </form>

        <Dialog
          key="submitResult"
          modal
          open={this.state.openAlertDialog}
        >
          您已注册成功，用户名为[{this.state.username}]，即将跳转到主页.
        </Dialog>
      </div>
    );
  }

}

export default withStyles(s)(withRouter(RegisterPage));
