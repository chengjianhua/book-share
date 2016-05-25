/**
 * Created by cjh95414 on 2016/5/3.
 */

import React, {PropTypes,Component} from 'react';
import AppBar from 'material-ui/AppBar';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import s from './AppHeader.scss';
import IndexTabs from "../IndexTabs";

class AppHeader extends Component {

  render() {

    return (
      <div className={s.root}>
        <div className={s.fixed}>
          <AppBar
            showMenuIconButton={false}
            titleStyle={{
              display: 'none',
            }}
            iconElementRight={
              <IndexTabs />
            }

            iconStyleRight={{
              marginLeft: 0,
              marginTop: 0,
              width: '100%'
             }}
          >
          </AppBar>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(AppHeader);
