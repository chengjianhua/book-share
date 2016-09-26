/**
 * Created by cjh95414 on 2016/5/5.
 */
import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// import {List, Map} from 'immutable';

import {fetchBookList} from '../../actions/Book';

import BookCard from '../BookCard';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './BookCardPage.scss';

import loadingGif from '../../public/img/loading.gif';

class BookCardPage extends Component {

  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    const {page} = this.props;
    if (page === 1) {
      this.loadBooksByPage(1);
    }
  }

  handleLoadMore = () => {
    const {page} = this.props;
    this.loadBooksByPage(page);
  };

  loadBooksByPage(page) {
    const {actions} = this.props;
    actions.fetchBookList(page);
  }

  render() {
    const {bookList} = this.props;
    const bookCards = bookList.map((book, index) => {
      const bookName = book.get('bookTitle');
      const bookIntro = book.get(['detail', 'summary']);
      const bookImg = book.getIn(['detail', 'images', 'large']);
      const title = book.get('shareTitle');
      const description = book.get('shareContent');
      const loading = '加载中……';

      return (
        <Link
          key={index}
          to={{
            pathname: `/share/book/${book.get('_id')}`,
          }}
        >
        <BookCard
          key={index}
          { ...{bookName, title, description}}
          bookIntro={bookIntro ? bookIntro.substr(0, 100).concat('...') : loading}
          bookImg={!bookImg ? loadingGif : bookImg}
        />
        </Link>
      );
    });

    return (
      <div className={s.root}>
        {bookCards}

        <RaisedButton
          label="LOAD MORE"
          onTouchTap={this.handleLoadMore}
          primary
          fullWidth
          style={{marginTop: '1rem', width: '100%'}}
        />
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
    actions: bindActionCreators(Object.assign({}, {fetchBookList}), dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(BookCardPage));
