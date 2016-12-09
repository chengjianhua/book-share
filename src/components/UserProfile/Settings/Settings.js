import React, { Component } from 'react';
import { withRouter } from 'react-router';

import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import withStyles from 'isomorphic-style-loader/lib/withStyles';

import * as accountsActions from 'actions/Accounts';
import s from './Settings.scss';

class Settings extends Component {

  constructor(props) {
    super(props);

    const { profile, username } = props;

    const { signature, gender } = profile.toJS();

    this.state = {
      username,
      signature,
      gender,
    };
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, actions, router } = this.props;
    const profile = Object.assign({}, this.state, { username });
    actions.updateUserProfile(profile)
    .then(() => {
      router.goBack();
    });
  }

  handleUsernameChange = (event, value) => {
    this.setState({
      username: value,
    });
  }

  handleSignatureChange = (event, value) => {
    this.setState({
      signature: value,
    });
  }

  handleGenderChange = (event, gender) => {
    this.setState({
      gender,
    });
  }

  render() {
    const { username, signature, gender } = this.state;

    const styles = {
      radioButton: {
        display: 'inline-block',
        width: '50%',
      },
      radioButtonGroup: {
        padding: '1rem',
      },
    };
    return (
      <div className={s.root}>
        <form onSubmit={this.handleFormSubmit}>
          <TextField
            fullWidth
            floatingLabelFixed
            key="username"
            id="settings-username"
            hintText="用户名"
            floatingLabelText="用户名"
            value={username}
            onChange={this.handleUsernameChange}
          />

          <TextField
            fullWidth
            floatingLabelFixed
            key="signature"
            id="settings-signature"
            hintText="请输入您的签名"
            floatingLabelText="签名"
            value={signature}
            onChange={this.handleSignatureChange}
          />

          <RadioButtonGroup
            name="gender"
            style={styles.radioButtonGroup}
            onChange={this.handleGenderChange}
            valueSelected={gender}
          >
            <RadioButton
              value="male"
              label="男同学"
              style={styles.radioButton}
            />
            <RadioButton
              value="female"
              label="女同学"
              style={styles.radioButton}
            />
          </RadioButtonGroup>

          <RaisedButton
            key="login-button"
            primary
            label="保存"
            type="submit"
            style={{ width: '100%' }}
          />
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    username: state.auth.get('username'),
    profile: state.auth.get('profile'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, accountsActions), dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(s)(withRouter(Settings)),
);
