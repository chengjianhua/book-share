/**
 * Created by cjh95414 on 2016/5/25.
 */
import React, {Component} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Map} from 'immutable';

import {addComment, fetchBook, star, unstar} from 'actions/Book';
import withApp from 'components/App/withApp';

import {StarButton} from 'common/Buttons';
import s from './BookDetailPage.scss';
import BookDetailCard from './BookDetailCard';
import CommentBox from './CommentBox';

class BookDetailPage extends Component {

  componentWillMount() {
    this.props.app.setAppBarIconRight(
      <StarButton
        onStar={this.handleStar}
        onUnstar={this.handleUnstar}
      />
    );

    const {actions, params: {id}} = this.props;

    actions.fetchBook(id);
  }

  handleStar = () => {
    const {actions, params: {id}, username} = this.props;
    actions.star(id, username);
  }

  handleUnstar = () => {
    const {actions, params: {id}, username} = this.props;
    actions.unstar(id, username);
  }

  handleComment = (commentContent) => {
    const {actions, params} = this.props;
    const comment = {
      content: commentContent,
      date: new Date(),
    };

    actions.addComment(params.id, comment);
  };

  render() {
    const {book, user} = this.props;
    const comments = book.get('comments');

    return (
      <div>
        <BookDetailCard
          user={user}
          book={book}
        />

        <CommentBox
          comments={comments ? comments.toJS() : []}
          onComment={this.handleComment}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    book: state.book.getIn(['book', 'detail']),
    username: state.auth.get('username'),
    user: new Map({
      username: state.auth.get('username'),
      profile: state.auth.get('profile'),
    }),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, {
      addComment, fetchBook, star, unstar,
    }), dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(s)(withApp(BookDetailPage))
);
