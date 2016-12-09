/**
 * Created by cjh95414 on 2016/5/3.
 */
import React, { Component, PropTypes } from 'react';
import { Link, withRouter } from 'react-router';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './Header.scss';

class Header extends Component {

  static propTypes = {
    iconElementRight: PropTypes.element,
    iconElementLeft: PropTypes.element,
  };

  handleTabChange = (activeTab) => {
    this.setState({
      activeTab,
    });
  };

  handleBackButtonTouchTap = () => {
    this.props.router.goBack();
  }

  render() {
    const iconElementLeft = this.props.iconElementLeft || (
      <IconButton onTouchTap={this.handleBackButtonTouchTap}>
        <ArrowBack />
      </IconButton>
    );

    const iconElementRight = this.props.iconElementRight || (
      <IconMenu
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
      >
        <Link to="/share/add">
          <MenuItem primaryText="发布分享" />
        </Link>
      </IconMenu>
    );


    return (
      <div className={s.root}>
        <div className={s.fixed}>
          <AppBar
            iconElementLeft={iconElementLeft}
            iconElementRight={iconElementRight}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(withRouter(Header));
