/**
 * Created by cjh95414 on 2016/5/3.
 */
import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
import AppBar from 'material-ui/AppBar';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import s from './PageHeader.scss';

class PageHeader extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  handleBackButtonTouchTap = () => {
    this.context.router.goBack();
  };

  render() {
    const iconElementRight = (
      <IconMenu
        iconButtonElement={ <IconButton><MoreVertIcon /></IconButton> }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <Link to="/share/add">
        <MenuItem key={'refresh'} primaryText="添加" />
        </Link>
      </IconMenu>
    );

    const iconElementLeft = (
      <IconButton onTouchTap={this.handleBackButtonTouchTap}>
        <ArrowBack />
      </IconButton>
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

export default withStyles(s)(PageHeader);
