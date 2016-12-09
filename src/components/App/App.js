import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { readToken } from 'actions/Auth';

import LoadingOverlay from 'common/LoadingOverlay';

import s from './App.scss';
import { appShape } from './propTypes';

class App extends Component {

  static propTypes = {
    error: PropTypes.instanceOf(Error),
    header: PropTypes.element,
  };

  static childContextTypes = {
    app: appShape,
  };

  state = {
    appbarIconRight: null,
  };

  getChildContext() {
    return {
      app: {

        setAppBarIconRight: (iconRight) => {
          this.setState({
            appBarIconRight: iconRight,
          });
        },

        restoreAppBar: () => {
          this.setState({
            appBarIconRight: null,
          });
        },

      },
    };
  }

  componentDidMount() {
    const { actions, token } = this.props;
    if (!token) {
      actions.readToken();
      console.log(`App.js initialize the app's token at client-side.`); // eslint-disable-line
    }
  }

  render() {
    const { main, header, error, children } = this.props;
    const { appBarIconRight } = this.state;
    const headerWithIcon = header ? React.cloneElement(header, {
      iconElementRight: appBarIconRight,
    }) : null;

    return !error ? (
      <div>
        {headerWithIcon}
        {main}
        <LoadingOverlay show={this.props.isLoading} />
      </div>
    ) : children;
  }

}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.get('isAuthenticated'),
    token: state.auth.get('token'),
    username: state.auth.get('username'),
    isLoading: state.app.get('isLoading'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, { readToken }), dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(App));
