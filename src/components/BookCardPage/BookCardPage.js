/**
 * Created by cjh95414 on 2016/5/5.
 */

//noinspection JSUnresolvedVariable,NpmUsedModulesInstalled
import React from "react";
import BookCard from "../BookCard";
import withStyles from 'isomorphic-style-loader/lib/withStyles';
//noinspection JSUnresolvedVariable
import s from "./BookCardPage.scss";

//noinspection NpmUsedModulesInstalled
import 'es6-promise';
//noinspection NpmUsedModulesInstalled
import'isomorphic-fetch';

class BookCardPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      bookList: []
    };
  }

  componentDidMount() {

    let bookList = [];

    fetch('http://123.206.6.150:9000/v2/book/user/63886625/collections', {
      mode: 'cors',
    }).then(function (response) {
      return response.json();
    }).then(function (json) {
      let collections = json.collections;

      collections.forEach(function (value, index) {

        let book = value.book;

        bookList.push(
          <BookCard
            key={index}
            bookName={book.title}
            bookIntro={book.summary.substr(0,100) + '...'}
            bookImg={book.images.large}
            title={book.subtitle}
          />
        );

      });

      this.setState({
        bookList: bookList
      });

    }.bind(this)).catch(function (ex) {
      console.log('parsing failed', ex)
    });
  }

  render() {

    return (
      <div className={s.root}>
        {this.state.bookList}
      </div>
    );
  }
}

export default withStyles(s)(BookCardPage);
