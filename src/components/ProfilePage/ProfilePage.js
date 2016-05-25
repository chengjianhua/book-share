/**
 * Created by cjh95414 on 2016/5/21.
 */

//noinspection NpmUsedModulesInstalled,JSUnresolvedVariable
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import colors from 'material-ui/styles/colors';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import IconButton from "material-ui/IconButton";
import FlatButton from "material-ui/FlatButton";
import Paper from 'material-ui/Paper';

import withStyles from 'isomorphic-style-loader/lib/withStyles';

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
      margin: 0,
      padding: '16px 0',
      textAlign: 'center',
    }, iconStyle = {
      position: 'absolute',
      top: '16px',
      right: '16px',

    };

    return (
      <div style={{marginTop: '1rem'}}>
        <Card >
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
        </Card>

        <Paper className={s.iconContainer}>
          <FlatButton
            className={s.iconButton}
            label="书籍"
            labelPosition="after"
            icon={ <FontIcon className="material-icons" color={"#FFF"}>book</FontIcon> }
            linkButton
            containerElement={<Link to="/" />}
          />

          <FlatButton
            className={s.iconButton}
            label="书单"
            labelPosition="after"
            icon={ <FontIcon className="material-icons" color={"rgba(100,0,100,0.87)"}>view_list</FontIcon> }
            linkButton
            containerElement={<Link className={s.iconButton} to="/" />}
          />

          <FlatButton
            className={s.iconButton}
            label="分享"
            labelPosition="after"
            icon={ <FontIcon style={{width: '48px', height: '48px'}} className="material-icons">home</FontIcon> }
            linkButton
            containerElement={<Link to="/" />}
          />

        </Paper>
      </div>
    );
  }
}

export default withStyles(s)(ProfilePage);