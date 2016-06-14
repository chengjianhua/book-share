/**
 * Created by cjh95414 on 2016/5/21.
 */

//noinspection NpmUsedModulesInstalled,JSUnresolvedVariable
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import ImageEdit from 'material-ui/svg-icons/image/edit';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from "material-ui/IconButton";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from 'material-ui/RaisedButton';
import {fullWhite, grey300, grey400} from 'material-ui/styles/colors';

import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';

import fetch from 'isomorphic-fetch';
import 'es6-promise';

import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './UserProfile.scss';

import avatar from '../../public/img/avatar.png';

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400}/>
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>删除</MenuItem>
  </IconMenu>
);

export default class UserProfile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tab: 0,
      books: [],
    };
  }

  static propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string,
      avatar: PropTypes.string,
      signature: PropTypes.string,
    }),

  };

  static defaultProps = {
    user: {
      username: 'chengjianhua',
      avatar: 'http://lorempixel.com/100/100/nature/',
      signature: 'To be or not to be !'
    },

  };

  handleTabChange = (value) => {
    this.setState({
      tab: value
    })
  };

  componentDidMount() {

    fetch(`/api/${this.props.params.username}/share/books`).then(function (response) {
      return response.json();
    }).then(function (json) {
      const books = json.books;

      this.setState({
        books: books,
      });
    }.bind(this));

  }

  render() {

    const style = {
      editButton: {
        // borderRadius: '5px'
      }
    };

    const user = this.props.user;

    const bookList = this.state.books.map(function (book, index) {
      return ([(
        <Link to={{pathname: "/share/book/" + book._id, state:{book}}}>
          <ListItem
            key={index}
            // leftAvatar={<Avatar src={user.avatar} />}
            leftIcon={<FontIcon className="material-icons">book</FontIcon>}
            rightIconButton={rightIconMenu}
            primaryText={
            <p>
              {book.shareTitle}
              <span style={{color: grey300, fontSize: '0.5rem'}}> - {book.bookTitle}</span> <br />
            </p>
          }
            secondaryText={
            <p>
              {book.shareContent.substr(0, 50)}
            </p>
          }
            secondaryTextLines={1}
          />
        </Link>
      ),
        <Divider inset={true}/>
      ]);
    });

    return (
      <div className={s.root}>

        <div className={s.avatarContainer}>

          <div className={s.avatar}>
            <img src={avatar} alt="avatar"/>
          </div>

          <div className={s.textContainer}>
            <p className={s.text}>To be or not to be!</p>
          </div>

          <div className={s.editButton}>
            <RaisedButton
              label="编辑"
              labelPosition="before"
              style={style.editButton}
              primary={true}
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

            <List>
              <Subheader>{this.state.books.length} 个分享</Subheader>
              {bookList}
            </List>

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
