/**
 * Created by cjh95414 on 2016/5/5.
 */

//noinspection JSUnresolvedVariable,NpmUsedModulesInstalled
import React, {Component} from "react";
import RaisedButton from 'material-ui/RaisedButton'
import {Link} from 'react-router';
import BookCard from "../BookCard";
import withStyles from 'isomorphic-style-loader/lib/withStyles';
//noinspection JSUnresolvedVariable
import s from "./BookCardPage.scss";

//noinspection NpmUsedModulesInstalled
import 'es6-promise';
//noinspection NpmUsedModulesInstalled
import fetch from 'isomorphic-fetch';

import loadingGif from '../../public/img/loading.gif';

class BookCardPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      books: [],
      page: 0,
    };
  }

  componentDidMount() {
    this.loadBooksByPage();
  }

  handleLoadMore = () => {
    this.loadBooksByPage();
  };

  loadBooksByPage() {

    // 获得当前数据的页数
    const page = this.state.page;

    fetch(`/api/share/books?page=${page + 1}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    }).then(function (response) {
      return response.json();
    }).then(function (json) {
      let books = json.books;

      // 入股获取到的数据不为空则 页号+1
      if (books.length > 0) {
        this.setState({
          page: page + 1
        });
      }

      // 当初次加载数据的时候
      if (page === 0) {
        // 预加载
        this.setState({
          books: books,
        });
      }

      // --------------------------------------------------------------------------|
      // 在数据全部加载完成以后将结果添加到 state 中
      Promise.all(books.map(function (book) {
        // ---------------------------------------------------------------------|
        // 将返回带有结果的 Promise 对象添加到数组当中，为了传递给 Promise.all
        return (
          fetch('http://123.206.6.150:9000/v2/book/' + book.bookId).then(function (response) {
            return response.json();
          }).then(function (json) {
            //noinspection UnnecessaryLocalVariableJS
            let bookDetail = Object.assign({}, book, {detail: json});
            // booksDetail.push(bookDetail);
            return bookDetail;
          })
        );
        // ---------------------------------------------------------------------|

      })).then(function (books) {

        // 将添加了豆瓣API中书籍详情的新books对象更新到this.state中
        if (page === 0) {
          this.setState({
            books: books
          });
        } else if (page > 0) {
          this.setState(function (previousState) {

            // 将当前获取到的新一页的数据追加到 state 中的 books 数组当中
            return {
              books: previousState.books.concat(books),
            }
          });
        }

      }.bind(this));
      // ---------------------------------------------------------------------------|

    }.bind(this)).catch(function (ex) {
      console.error('首页数据加载失败:\n', ex)
    });

  }

  render() {

    const bookCards = this.state.books.map(function (book, index) {
      let bookDetail = book.detail ? book.detail : null,
        loading = '加载中……';

      return (
        <Link
          key={index}
          to={{
            pathname: `/share/book/${book._id}`,
            state: {
             book
            }
          }}
        >
          <BookCard
            key={index}
            bookName={book.bookTitle}
            bookIntro={bookDetail ? bookDetail.summary ? bookDetail.summary.substr(0,100): loading + '...' : loading}
            bookImg={bookDetail? bookDetail.images ? bookDetail.images.large : loading : loadingGif}
            title={book.shareTitle}
            description={book.shareContent}
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
          primary={true}
          fullWidth={true}
          style={{marginTop: '1rem', width: '100%'}}
        />
      </div>
    );
  }
}

export default withStyles(s)(BookCardPage);
