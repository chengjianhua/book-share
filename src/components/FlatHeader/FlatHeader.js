/**
 * Created by cjh95414 on 2016/5/3.
 */

import React from 'react';
import AppBar from 'material-ui/lib/app-bar';

class FlatHeader extends React.Component {
  render() {
    return (
      <AppBar
        title="菜单"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
      />
    );
  }
}

export default FlatHeader;
