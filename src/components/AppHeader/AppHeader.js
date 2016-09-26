/**
 * Created by cjh95414 on 2016/5/3.
 */
import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Tabs from 'material-ui/Tabs/Tabs';
import Tab from 'material-ui/Tabs/Tab';
import AccountBox from 'material-ui/svg-icons/action/account-box';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';

import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './AppHeader.scss';

const style = {
  appBar: {
    flexWrap: 'wrap',
  },
  tabs: {
    width: '100%',
    marginTop: '-20px',
  },
};

class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  handleChange = (value) => {
    this.setState({
      value,
    });
  };

  render() {
    const {username} = this.props;

    const iconElementRight = (
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <Link to="/share/add">
          <MenuItem primaryText="添加" />
        </Link>
      </IconMenu>
    );

    return (
      <div className={s.root}>
        <div className={s.fixed}>
          <AppBar
            title="浏览"
            style={style.appBar}
            iconElementRight={iconElementRight}
          >
            <Tabs
              style={style.tabs}
              value={this.state.value}
              onChange={this.handleChange}
            >
              <Tab
                value={0}
                icon={ <ActionHome /> }
                linkButton
                containerElement={<Link to="/" />}
              />
              <Tab
                value={1}
                icon={ <ActionFavorite /> }
                linkButton
                containerElement={<Link to="/sign" />}
              />
              <Tab
                value={2}
                icon={ <AccountBox /> }
                linkButton
                containerElement={<Link to={`/${username}`} />}
              />
            </Tabs>
          </AppBar>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    username: state.auth.get('username'),
  };
}

export default connect(mapStateToProps)(withStyles(s)(AppHeader));
