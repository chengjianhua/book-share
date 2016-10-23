import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import FastClick from 'fastclick';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Location from './core/Location';
import {addEventListener, removeEventListener} from './core/DOMUtils';
import WithStylesContext from './components/WithStylesContext';

import routes from './router/routes';

import buildStore from './store/buildStore';

import {readToken} from './actions/Auth';

injectTapEventPlugin();

// import {fetchJson} from './core/fetch';

let store = buildStore();
store.dispatch(readToken());
store = buildStore(store.getState());

const appContainer = document.getElementById('app');

// Google Analytics tracking. Don't send 'pageview' event after the first
// rendering, as it was already sent by the Html component.
let trackPageview = () => (trackPageview = () => window.ga('send', 'pageview'));

const muiTheme = getMuiTheme({userAgent: navigator.userAgent});

function render(state) {
  if (state.scrollY !== undefined) {
    window.scrollTo(state.scrollX, state.scrollY);
  } else {
    window.scrollTo(0, 0);
  }

  trackPageview();

  // match({ browserHistory, routes }, (error, redirectLocation, renderProps) => {
  //  ReactDOM.render(<Router  history={browserHistory} routes={routes} {...renderProps} />, appContainer);
  //  });

  ReactDOM.render(
    <Provider store={store}>
      <WithStylesContext onInsertCss={styles => styles._insertCss()}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <Router history={browserHistory} routes={routes} />
        </MuiThemeProvider>
      </WithStylesContext>
    </Provider>, appContainer
  );
}

function run() {
  let currentLocation = null;
  let currentState = null;

  // Make taps on links and buttons work fast on mobiles
  FastClick.attach(document.body);

  // Re-render the app when window.location changes
  const unlisten = Location.listen(location => {
    currentLocation = location;
    currentState = Object.assign({}, location.state, {
      path: location.pathname,
      query: location.query,
      state: location.state,
    });
    render(currentState);
  });

  // Save the page scroll position into the current location's state
  const supportPageOffset = window.pageXOffset !== undefined;
  const isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat');
  const setPageOffset = () => {
    currentLocation.state = currentLocation.state || Object.create(null);
    if (supportPageOffset) {
      currentLocation.state.scrollX = window.pageXOffset;
      currentLocation.state.scrollY = window.pageYOffset;
    } else {
      currentLocation.state.scrollX = isCSS1Compat ?
        document.documentElement.scrollLeft : document.body.scrollLeft;
      currentLocation.state.scrollY = isCSS1Compat ?
        document.documentElement.scrollTop : document.body.scrollTop;
    }
  };

  addEventListener(window, 'scroll', setPageOffset);
  addEventListener(window, 'pagehide', () => {
    removeEventListener(window, 'scroll', setPageOffset);
    unlisten();
  });
}

// Run the application when both DOM is ready and page content is loaded
if (['complete', 'loaded', 'interactive'].includes(document.readyState) && document.body) {
  run();
} else {
  document.addEventListener('DOMContentLoaded', run, false);
}
