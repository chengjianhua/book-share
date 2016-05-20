/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, {Component, PropTypes} from "react";
import emptyFunction from "fbjs/lib/emptyFunction";
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import '../../../node_modules/normalize.css/normalize.css';
import s from "./App.scss";
import FlatHeader from "../FlatHeader";
import FlatFooter from "../FlatFooter";

class App extends Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    children: PropTypes.element.isRequired,
    error: PropTypes.object,
  };

  render() {
    return !this.props.error ? (
      <div>
        <FlatHeader />
        {this.props.children}
        <FlatFooter />
      </div>
    ) : this.props.children;
  }

}

export default withStyles(s)(App);
