/**
 * Created by cjh95414 on 2016/5/3.
 */

//noinspection JSUnresolvedVariable,NpmUsedModulesInstalled
import React, {PropTypes} from "react";
import Tabs from "material-ui/Tabs/Tabs";
import Tab from "material-ui/Tabs/Tab";
import AccountBox from "material-ui/svg-icons/action/account-box";
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
      value: 0
    };
  }

  handleChange = (value)=> {
    this.setState({
      value: value
    });

    console.log(`Link has been changed from [${this.state.value}] to [${value}]`);

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
            value={0}
            style={tabStyle}
            icon={ <ActionHome  /> }
            linkButton
            containerElement={<Link to="/" />}
          />

          <Tab
            value={1}
            style={tabStyle}
            icon={ <ActionFavorite /> }
            linkButton
            containerElement={<Link to="/sign" />}
          />

          <Tab
            value={2}
            style={tabStyle}
            icon={ <AccountBox /> }
            linkButton
            containerElement={<Link to="/chengjianhua" />}
          />

        </Tabs>
      </div>
    );
  }
}


export default withStyles(s)(IndexTabs);
