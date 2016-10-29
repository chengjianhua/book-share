/**
 * Created by cjh95414 on 2016/5/25.
 */
import React, {Component, PropTypes} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addComment, fetchBook} from 'actions/Book';

import {StarButton} from 'common/Buttons';
import s from './BookDetailPage.scss';
import BookDetailCard from './BookDetailCard';
import CommentBox from './CommentBox';

class BookDetailPage extends Component {

  static contextTypes = {
    setAppBarIconRight: PropTypes.func,
  };

  componentWillMount() {
    this.context.setAppBarIconRight(
      <StarButton />
    );
    const {actions, params: {id}} = this.props;

    actions.fetchBook(id);
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
    const {book} = this.props;
    const comments = book.get('comments');

    return (
      <div>
        <BookDetailCard
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, {
      addComment, fetchBook,
    }), dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(BookDetailPage));
