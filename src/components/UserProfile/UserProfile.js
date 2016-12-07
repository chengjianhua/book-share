/**
 * Created by cjh95414 on 2016/5/21.
 */
import React, { Component } from 'react';
import { Link } from 'react-router';

import Subheader from 'material-ui/Subheader';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import { Tabs, Tab } from 'material-ui/Tabs';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as accountsActions from 'actions/Accounts';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import LoadingOverlay from 'components/common/LoadingOverlay';
import ShareList from './ShareList';
import s from './UserProfile.scss';

import avatar from '../../public/img/avatar.png';

class UserProfile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tab: 0,
    };
  }

  componentDidMount() {
    const { actions, username, books, starredBooks } = this.props;

    if (!books.size) {
      actions.fetchUserBooks(username);
    }

    if (!starredBooks.size) {
      actions.fetchStarredBooks(username);
    }
  }

  handleTabChange = (tab) => {
    this.setState({
      tab,
    });
  };

  render() {
    const { books, isLoading, profile, starredBooks } = this.props;

    return (
      <div className={s.root}>

        <div className={s.avatarContainer}>

          <div className={s.avatar}>
            <img src={avatar} alt="avatar" />
          </div>

          <div className={s.textContainer}>
            <p className={s.text}>{profile.get('signature')}</p>
          </div>

          <div className={s.editButton}>
            <Link to="/user/settings">
              <RaisedButton primary label="编辑" labelPosition="before" />
            </Link>
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
            <div>
              <Subheader>{books.size} 个分享</Subheader>
              <ShareList data={books} />
            </div>
          </Tab>

          <Tab
            value={1}
            icon={<FontIcon className="material-icons">favorite</FontIcon>}
          >
            <div>
              <Subheader>{starredBooks.size} 个喜欢</Subheader>
              <ShareList data={starredBooks} />
            </div>
          </Tab>
        </Tabs>

        <LoadingOverlay show={isLoading} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.accounts.getIn(['books', 'isLoading']),
    books: state.accounts.getIn(['books', 'data']),
    starredBooks: state.accounts.getIn(['stars', 'books']),
    profile: state.auth.get('profile'),
    username: state.auth.get('username'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, accountsActions), dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(UserProfile));
