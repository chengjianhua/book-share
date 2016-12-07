import React, { Component } from 'react';
import { withRouter } from 'react-router';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

import s from './RegisterPage.scss';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { checkUsername, register } from 'actions/Auth';

class RegisterPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      openAlertDialog: false,
      isValidUsername: false,
    };
  }

  handleUsernameChange = (event, value) => {
    event.stopPropagation();

    this.setState({
      username: value,
    });
  };

  handleUsernameBlur = (event) => {
    const username = event.target.value;
    const { actions } = this.props;

    actions.checkUsername(username)
      .then(isSuccess => {
        this.setState({
          isValidUsername: isSuccess,
        });
      });
  };

  handlePasswordChange = (event, value) => {
    event.stopPropagation();

    this.setState({
      password: value,
    });
  };

  handleRegisterSubmit = (event) => {
    event.preventDefault();

    this.setState({
      isValidUsername: false,
    });

    const { actions } = this.props;
    const { username, password } = this.state;

    const user = {
      username, password,
    };

    actions.register(user)
      .then(isSuccess => {
        if (isSuccess) {
          this.form.submit();
        }
      });
  };

  render() {
    const { isValidUsername } = this.state;
    const { originalUrl } = this.props;
    return (
      <div className={s.root}>
        <form
          method="post"
          ref={form => {this.form = form;}}
          action={`/manage/login?originalUrl=${originalUrl}`}
          onSubmit={this.handleRegisterSubmit}
        >
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
            onBlur={this.handleUsernameBlur}
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
            primary
            key="register-button"
            label="注册"
            type="submit"
            style={{ width: '100%', marginTop: '1rem' }}
            disabled={!isValidUsername}
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

export default connect(null, (dispatch) => ({
  actions: bindActionCreators(Object.assign({}, { checkUsername, register }), dispatch),
}))(withStyles(s)(withRouter(RegisterPage)));
