/**
 * Created by cjh95414 on 2016/5/3.
 */

//noinspection JSUnresolvedVariable,NpmUsedModulesInstalled
import React, {PropTypes} from "react";
import Tabs from "material-ui/Tabs/Tabs";
import Tab from "material-ui/Tabs/Tab";
import ActionFlightTakeoff from "material-ui/svg-icons/action/flight-takeoff";
import ActionHome from "material-ui/svg-icons/action/home";
import ActionFavorite from "material-ui/svg-icons/action/favorite";
import withStyles from 'isomorphic-style-loader/lib/withStyles';
//noinspection JSUnresolvedVariable
import s from "./IndexTabs.scss";

import {Link} from "react-router";

class IndexTabs extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: "/"
    };
  }

  handleChange = (value)=> {
    this.setState({
      value: value
    });

    console.log(`Link has been changed from [${this.state.value}] to [${value}]`);

  };

  handleActive = (value) => {

    console.log(`${value} has been activated!`);

  };


  render() {

    const tabStyle = {
      textAlign: "center",
      paddingTop: "14px"
    };


    return (
      <div>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
        >

          <Tab
            value="/"
            style={tabStyle}
            icon={ <ActionHome  /> }
            linkButton
            containerElement={<Link to="/" />}
            onActive={this.handleActive}
          />

          <Tab
            value="/login"
            style={tabStyle}
            icon={ <ActionFlightTakeoff /> }
            linkButton
            containerElement={<Link to="/login" />}
            onActive={this.handleActive}
          />

          <Tab
            value="/me"
            style={tabStyle}
            icon={ <ActionFavorite /> }
            linkButton
            containerElement={<Link to="/me" />}
            onActive={this.handleActive}
          />

        </Tabs>
      </div>
    );
  }
}


export default withStyles(s)(IndexTabs);
