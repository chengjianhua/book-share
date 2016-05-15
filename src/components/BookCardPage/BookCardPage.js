/**
 * Created by cjh95414 on 2016/5/5.
 */

import React from "react";
import BookCard from "../BookCard";
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from "./BookCardPage.scss";

class BookCardPage extends React.Component {

  render() {

    var bookList = [];

    for (let i = 0; i < 5; i++) {
      bookList.push(<BookCard userName="Cheng" key={i}/>);
    }

    return (
      <div className={s.root}>
        {bookList}
      </div>
    );
  }
}

export default withStyles(BookCardPage, s);
