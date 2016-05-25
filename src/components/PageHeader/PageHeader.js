/**
 * Created by cjh95414 on 2016/5/3.
 */

import React, {PropTypes, Component} from 'react';
import AppBar from 'material-ui/AppBar';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import s from './PageHeader.scss';

class PageHeader extends Component {


  render() {

    const iconStyleRight = {}, titleStyle = {};

    return (
      <div className={s.root}>
        <div className={s.fixed}>
          <AppBar
            titleStyle={titleStyle}
            iconElementLeft={<IconButton><NavigationClose /></IconButton>}
            iconElementRight={
              <IconMenu
                iconButtonElement={ <IconButton><MoreVertIcon /></IconButton> }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              >
                <MenuItem primaryText="Refresh" />
                <MenuItem primaryText="Help" />
                <MenuItem primaryText="Sign out" />
              </IconMenu>
            }

            iconStyleRight={iconStyleRight}
          >
          </AppBar>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(PageHeader);
