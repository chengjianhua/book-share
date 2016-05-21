/**
 * Created by cjh95414 on 2016/5/21.
 */

//noinspection NpmUsedModulesInstalled,JSUnresolvedVariable
import React, {Component, PropTypes} from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/lib/card';
import FontIcon from 'material-ui/lib/font-icon';
import ChevronRight from 'material-ui/lib/svg-icons/navigation/chevron-right';
import IconButton from "material-ui/lib/icon-button";
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {Link} from 'react-router';

import s from './ProfilePage.scss';

export default class ProfilePage extends Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    userName: PropTypes.string,
    avatar: PropTypes.string,
  };

  static defaultProps = {
    userName: 'Cheng',
    avatar: 'http://lorempixel.com/100/100/nature/',
  };


  render() {

    const textStyle = {
      display: 'inline-block',
      width: '50%',
      margin: '0',
      padding: '16px 0',
      textAlign: 'center',
    }, iconStyle = {
      position: 'absolute',
      top: '16px',
      right: '16px',

    };

    return (
      <Card>
        <CardHeader
          title={this.props.userName}
          subtitle="Subtitle"
          avatar={this.props.avatar}
        >
          <Link to="/">
            <IconButton style={iconStyle}>
              <ChevronRight color="#AAAAAA"/>
            </IconButton>
          </Link>
        </CardHeader>
 
        <CardText style={textStyle}>书籍 12</CardText>
        <CardText style={textStyle}>书单 5</CardText>

        {/*<FontIcon className="material-icons">navigate_next</FontIcon>*/}
      </Card>
    );
  }
}

export default withStyles(s)(ProfilePage);
