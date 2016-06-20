/**
 * Created by Cheng jianhua at 11:10 on 2016/6/6
 */

import React, {Component, PropTypes} from "react";
import TextField from "material-ui/TextField";
import Dialog from 'material-ui/Dialog';
import RaisedButton from "material-ui/RaisedButton";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./LoginPage.scss";
import fetch from "isomorphic-fetch";
import "es6-promise";

class LoginPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      openAlertDialog: false
    };
  }

  static contextTypes={
    router: PropTypes.object.isRequired
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('登录表单已被拦截');

    let postData = {
      username: this.state.username,
      password: this.state.password
    };

    //noinspection JSUnresolvedFunction
    fetch(`/manage/login`, {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json"
      },
    }).then(function (response) {
      return response.json();
    }).then(function (data) {

      // If server return a message that indicates the submit is successful, then switching to homepage.
      if (data.isSuccess) {
        
        localStorage.user = data.user;
        
        // 打开成功的提示弹窗并在定时时间后自动跳转到主页
        this.setState({
          openAlertDialog: true
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
      username: value
    });
  };

  handlePasswordChange = (event, value) => {
    event.stopPropagation();

    this.setState({
      password: value
    });
  };

  render() {
    return (
      <div className={s.root}>

        <form method="post" action="" onSubmit={this.handleFormSubmit}>
          <TextField
            key="login-username"
            hintText="请输入您的用户名"
            fullWidth={true}
            value={this.state.username}
            onChange={this.handleUsernameChange}
          />

          <TextField
            key="login-password"
            hintText="请输入您的密码"
            fullWidth={true}
            type="password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />

          <RaisedButton
            key="login-button"
            label="登录"
            primary={true}
            type="submit"
            style={{width: '100%'}}
          />
        </form>

        <Dialog
          key="submitResult"
          modal={false}
          open={this.state.openAlertDialog}
        >
          您已登录成功，用户名为[{this.state.username}]，即将跳转到主页.
        </Dialog>

      </div>
    );
  }

}

export default withStyles(s)(LoginPage);
