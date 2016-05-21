/**
 * Created by cjh95414 on 2016/5/5.
 */

//noinspection JSUnresolvedVariable,NpmUsedModulesInstalled
import React from "react";
import BookCard from "../BookCard";
import withStyles from 'isomorphic-style-loader/lib/withStyles';
//noinspection JSUnresolvedVariable
import s from "./BookCardPage.scss";

class BookCardPage extends React.Component {

  render() {

    var bookList = [];

    for (let i = 0; i < 5; i++) {
      bookList.push(<BookCard key={i}/>);
    }

    return (
      <div>
        {bookList}
      </div>
    );
  }
}

export default withStyles(s)(BookCardPage);
