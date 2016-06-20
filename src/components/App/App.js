import React, {Component, PropTypes} from "react";
import baseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import "../../../node_modules/normalize.css/normalize.css";
import s from "./App.scss";
import auth from "../../core/auth";

class App extends Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    children: PropTypes.element.isRequired,
    error: PropTypes.object,
    header: PropTypes.element,
  };

  static childContextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  //noinspection JSMethodCanBeStatic
  getChildContext() {
    return {
      muiTheme: getMuiTheme(baseTheme),
    };
  }

  render() {

    return !this.props.error ? (
      <div>
        {this.props.header && this.props.header}
        {this.props.children}
      </div>
    ) : this.props.children;
  }

}

export default withStyles(s)(App);
