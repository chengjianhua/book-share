import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './App.scss';

import {readToken} from 'actions/Auth';

class App extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    error: PropTypes.object,
    header: PropTypes.element,
  };

  // static childContextTypes = {
  //   muiTheme: PropTypes.object.isRequired,
  // };
  //
  // getChildContext() {
  //   return {
  //     muiTheme: getMuiTheme(baseTheme),
  //   };
  // }

  componentDidMount() {
    const {actions, token} = this.props;
    if (!token) {
      actions.readToken();
      console.log(`App.js initialize the app's token at client-side.`); // eslint-disable-line
    }
  }

  render() {
    const {header, children, error} = this.props;
    return !error ? (
      <div>
        {header}
        {children}
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
