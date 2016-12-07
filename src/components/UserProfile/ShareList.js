import React, { PropTypes, PureComponent } from 'react';
import { Link } from 'react-router';

import { List, ListItem } from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';

import { List as IList } from 'immutable';

import { grey300, grey400 } from 'material-ui/styles/colors';

const iconButtonElement = (
  <IconButton
    touch
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>删除</MenuItem>
  </IconMenu>
);

const style = {
  shareTitle: {
    color: 'rgba(0, 0, 0, 0.870588)',
  },
  bookTitle: {
    color: grey300,
    fontSize: '0.5rem',
  },
};

class ShareList extends PureComponent {
  static propTypes = {
    data: PropTypes.instanceOf(IList),
  };

  static defaultProps = {
    data: new IList(),
  };

  render() {
    const { data } = this.props;
    const items = data.map(item => {
      const shareTitle = item.get('shareTitle');
      const bookTitle = item.get('bookTitle');
      const shareContent = item.get('shareContent') ?
        item.get('shareContent').substr(0, 50) :
        '加载中 ...';

      const primaryText = (
        <p>
          <Link
            style={style.shareTitle}
            to={{
              pathname: `/share/book/${item.get('_id')}`,
              state: { item },
            }}
          >
            {shareTitle}
          </Link>
          <span style={style.bookTitle}> - {bookTitle}</span>
        </p>
      );

      const secondaryText = (
        <p>{shareContent}</p>
      );

      return [(
        <ListItem
          key={shareTitle + bookTitle}
          secondaryTextLines={1}
          leftIcon={<FontIcon className="material-icons">book</FontIcon>}
          rightIconButton={rightIconMenu}
          primaryText={primaryText}
          secondaryText={secondaryText}
        />
      ),
        <Divider inset />,
      ];
    }).toJS();

    return (
      <List>
        {items}
      </List>
    );
  }
}

export default ShareList;
