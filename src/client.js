/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import FastClick from "fastclick";
import Location from "./core/Location";
import {addEventListener, removeEventListener} from "./core/DOMUtils";
import injectTapEventPlugin from "react-tap-event-plugin";

import {Router, browserHistory, match} from "react-router";
import routes from "./router/routes";

import WithStylesContext from "./components/WithStylesContext";

injectTapEventPlugin();

const appContainer = document.getElementById('app');

// Google Analytics tracking. Don't send 'pageview' event after the first
// rendering, as it was already sent by the Html component.
let trackPageview = () => (trackPageview = () => window.ga('send', 'pageview'));

function render(state) {

  if (state.scrollY !== undefined) {
    window.scrollTo(state.scrollX, state.scrollY);
  } else {
    window.scrollTo(0, 0);
  }

  trackPageview();

  /*match({ browserHistory, routes }, (error, redirectLocation, renderProps) => {
   ReactDOM.render(<Router  history={browserHistory} routes={routes} {...renderProps} />, appContainer);
   });*/

  ReactDOM.render(
    <WithStylesContext onInsertCss={styles => styles._insertCss()}>
      <Router history={browserHistory} routes={routes}/>
    </WithStylesContext>, appContainer
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

  console.log("Client script is running !");

}

// Run the application when both DOM is ready and page content is loaded
if (['complete', 'loaded', 'interactive'].includes(document.readyState) && document.body) {
  run();
} else {
  document.addEventListener('DOMContentLoaded', run, false);
}
