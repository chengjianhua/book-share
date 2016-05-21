/**
 * Created by cjh95414 on 2016/5/3.
 */

//noinspection JSUnresolvedVariable,NpmUsedModulesInstalled
import React, {PropTypes} from "react";
import Tabs from "material-ui/lib/tabs/tabs";
import Tab from "material-ui/lib/tabs/tab";
import ActionFlightTakeoff from "material-ui/lib/svg-icons/action/flight-takeoff";
import ActionHome from "material-ui/lib/svg-icons/action/home";
import ActionFavorite from "material-ui/lib/svg-icons/action/favorite";
import withStyles from 'isomorphic-style-loader/lib/withStyles';
//noinspection JSUnresolvedVariable
import s from "./IndexTabs.scss";

import {Link} from "react-router";

/*class LinkTab extends React.Component {
 static propTypes = {
 to: PropTypes.string.isRequired,
 children: React.PropTypes.node,
 selected: React.PropTypes.bool,
 };

 render() {
 const styles = {
 height: 0,
 overflow: 'hidden',
 width: '100%',
 position: 'relative',
 textAlign: 'initial',
 };

 if (this.props.selected) {
 delete styles.height;
 delete styles.overflow;
 }

 return (
 <div style={styles}>
 <Link to={this.props.to || "/login"}>
 {this.props.children}
 </Link>
 </div>
 );
 }
 }*/

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
      <div className={s.root}>
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


export default (IndexTabs);
