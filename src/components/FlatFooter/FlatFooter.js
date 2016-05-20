/**
 * Created by cjh95414 on 2016/5/3.
 */

import React from "react";
import Tabs from "material-ui/lib/tabs/tabs";
import Tab from "material-ui/lib/tabs/tab";
import FontIcon from "material-ui/lib/font-icon";
import ActionFlightTakeoff from "material-ui/lib/svg-icons/action/flight-takeoff";
import ActionHome from "material-ui/lib/svg-icons/action/home";
import ActionFavorite from "material-ui/lib/svg-icons/action/favorite";
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import {Link, browserHistory} from "react-router";

import "./FlatFooter.scss";

class FlatFooter extends React.Component {

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

    console.log(`state has been changed from ${this.state.value} to ${value}`);

  };

  handleTouchTap = (value) => {

    console.log(`${value.target} has been activated!`);


  };

  render() {
    return (
      <div>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}>

          <Tab value="/"
               icon={ <Link to="/"> <ActionHome  /> </Link> }/>

          <Tab value="/login"
               onTouchTap={this.handleTouchTap}
               icon={ <Link to="/login"> <ActionFlightTakeoff /> </Link> }/>

          <Tab value="/me"
               onTouchTap={this.handleTouchTap}
               icon={ <ActionFavorite /> }/>

        </Tabs>
      </div>
    );
  }
}

export default FlatFooter;
