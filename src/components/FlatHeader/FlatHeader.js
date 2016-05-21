/**
 * Created by cjh95414 on 2016/5/3.
 */

import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';

import IndexTabs from "../IndexTabs";

class FlatHeader extends React.Component {
  render() {
    return (
      <AppBar
        showMenuIconButton={true}
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
        iconElementLeft={ <IndexTabs /> }
      >
      </AppBar>
    );
  }
}

export default FlatHeader;
