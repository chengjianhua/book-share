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

import Link from "../Link";

import s from "./FlatFooter.scss";

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

  handleActive = (value) => {

    console.log(`${value.target} has been activated!`);
    // console.log(`state has been changed from ${this.state.value} to ${value}`);

  };

  render() {
    return (
      <div className={s.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}>
          <Tab value="/" icon={ <Link to="/"><ActionHome  /></Link> }>
          </Tab>
          <Tab value="/contact" onTouchTap={this.handleActive} icon={ <Link to="/contact"><ActionFlightTakeoff /></Link> }>
          </Tab>
          <Tab value="/me" icon={ <ActionFavorite /> }>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default withStyles(FlatFooter, s);
