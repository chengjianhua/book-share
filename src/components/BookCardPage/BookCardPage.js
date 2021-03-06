/**
 * Created by cjh95414 on 2016/5/5.
 */
import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import {List, Map} from 'immutable';

import { fetchBookList } from '../../actions/Book';
import BriefShareCard from './BriefShareCard';
import s from './BookCardPage.scss';

class BookCardPage extends Component {

  componentWillMount() {
    const { bookList } = this.props;
    if (bookList.size === 0) {
      this.loadBooksByPage(1);
    }
  }

  handleLoadMore = () => {
    const { page } = this.props;
    this.loadBooksByPage(page);
  };

  loadBooksByPage(page) {
    const { actions } = this.props;
    actions.fetchBookList(page);
  }

  render() {
    const { bookList } = this.props;
    const bookCards = bookList.map((book, index) => {
      const bookName = book.get('bookTitle');
      const bookImg = book.getIn(['detail', 'images', 'large']);
      const title = book.get('shareTitle');
      const content = book.get('shareContent');
      const commentsCount = book.get('commentsCount');

      return (
        <Link
          key={index}
          to={{
            pathname: `/share/book/${book.get('_id')}`,
          }}
        >
          <BriefShareCard
            key={index}
            id={book.get('_id')}
            img={bookImg}
            title={title}
            content={content}
            username={'chengjianhua'}
            bookName={bookName}
            commentsCount={commentsCount}
          />
        </Link>
      );
    });

    return (
      <div className={s.root}>
        {bookCards}
        <div className={s.loadButton}>
          <RaisedButton
            label="点击加载更多"
            onTouchTap={this.handleLoadMore}
            primary
            fullWidth
            style={{ marginTop: '1rem', width: '100%' }}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    bookList: state.book.getIn(['bookList', 'data']),
    page: state.book.getIn(['bookList', 'page']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, { fetchBookList }), dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(BookCardPage));
