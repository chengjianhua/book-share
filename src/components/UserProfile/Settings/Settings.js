import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import {List, ListItem} from 'material-ui/List';
// import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
// import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
// import ImageEdit from 'material-ui/svg-icons/image/edit';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
// import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {grey300, grey400} from 'material-ui/styles/colors';
// import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import TextField from 'material-ui/TextField';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as accountsActions from '../../../actions/Accounts';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Settings.scss';
import LoadingOverlay from '../../common/LoadingOverlay';

import {withRouter} from 'react-router';

const iconButtonElement = (
  <IconButton
    touch
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>删除</MenuItem>
  </IconMenu>
);

class Settings extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      signature: '',
      gender: '',
    };
  }

  componentDidMount() {
    const {actions} = this.props;
    actions.fetchUserProfile(Globals.profile.username);
  }

  componentWillReceiveProps(nextProps) {
    const {profile} = nextProps;
    this.setState({
      ...profile.toJS(),
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {username, actions, router} = this.props;
    const profile = Object.assign({}, this.state, {username});
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
    const {username, signature, gender} = this.state;

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
            key="username"
            hintText="用户名"
            floatingLabelFixed
            floatingLabelText="用户名"
            value={username}
            onChange={this.handleUsernameChange}
          />

          <TextField
            fullWidth
            key="signature"
            hintText="请输入您的签名"
            floatingLabelFixed
            floatingLabelText="签名"
            value={signature}
            onChange={this.handleSignatureChange}
          />

          <RadioButtonGroup
            name="gender"
            style={styles.radioButtonGroup}
            onChange={this.handleGenderChange}
            defaultSelected={gender}
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
            style={{width: '100%'}}
          />
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    username: state.auth.get('username'),
    profile: state.accounts.get('profile'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, accountsActions), dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(withRouter(Settings)));
