import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './App.scss';

import {readToken} from 'actions/Auth';

class App extends Component {

  static propTypes = {
    error: PropTypes.object,
    header: PropTypes.element,
  };

  static childContextTypes = {
    setAppBarIconRight: PropTypes.func,
  };

  state = {
    appbarIconRight: null,
  };

  getChildContext() {
    return {
      setAppBarIconRight: (iconRight) => {
        this.setState({
          appBarIconRight: iconRight,
        });
      },
    };
  }

  componentDidMount() {
    const {actions, token} = this.props;
    if (!token) {
      actions.readToken();
      console.log(`App.js initialize the app's token at client-side.`); // eslint-disable-line
    }
  }

  render() {
    const {main, header, error, children} = this.props;
    const {appBarIconRight} = this.state;
    const headerWithIcon = header ? React.cloneElement(header, {
      iconElementRight: appBarIconRight,
    }) : null;

    return !error ? (
      <div>
        {headerWithIcon}
        {main}
      </div>
    ) : children;
  }

}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.get('isAuthenticated'),
    token: state.auth.get('token'),
    username: state.auth.get('username'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, {readToken}), dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(App));
