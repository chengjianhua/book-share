/**
 * Created by cjh95414 on 2016/5/21.
 */

//noinspection NpmUsedModulesInstalled,JSUnresolvedVariable
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import IconButton from "material-ui/IconButton";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from 'material-ui/RaisedButton';
import {fullWhite} from 'material-ui/styles/colors';

import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';

import fetch from 'isomorphic-fetch';
import 'es6-promise';

import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './UserProfile.scss';

import avatar from '../../public/img/avatar.png';

export default class UserProfile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tab: 0
    };
  }

  static propTypes = {
    userName: PropTypes.string,
    avatar: PropTypes.string,
    signature: PropTypes.string,
  };

  static defaultProps = {
    userName: 'Cheng',
    avatar: 'http://lorempixel.com/100/100/nature/',
    signature: 'To be or not to be !'
  };

  handleTabChange = (value) => {
    this.setState({
      tab: value
    })
  };
  
  componentDidMount() {
    
    
  }

  render() {

    const style = {
      editButton: {
        // borderRadius: '5px'
      }
    };

    return (
      <div className={s.root}>

        <div className={s.avatarContainer}>

          <div className={s.avatar}>
            <img src={avatar} alt="avatar"/>
          </div>

          <div className={s.textContainer}>
            <p className={s.text}>
              To be or not to be!
            </p>
          </div>

          <div className={s.editButton}>
            <RaisedButton
              label="编辑"
              // labelColor="#ffffff"
              labelPosition="before"
              style={style.editButton}
              primary={true}
              // backgroundColor="transparent"
            />
          </div>

        </div>

        <Tabs
          value={this.state.tab}
          onChange={this.handleTabChange}
        >
          <Tab
            value={0}
            icon={<FontIcon className="material-icons">share</FontIcon>}
          >


          </Tab>

          <Tab
            value={1}
            icon={<FontIcon className="material-icons">favorite</FontIcon>}
          >

          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default withStyles(s)(UserProfile);
