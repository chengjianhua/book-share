/**
 * Created by cjh95414 on 2016/5/25.
 */
import React, {PropTypes, Component} from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./BookDetailPage.scss";
import "es6-promise";
import fetch from "isomorphic-fetch";
import BookDetailCard from "./BookDetailCard";
import CommentBox from "./CommentBox";

class BookDetailPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      book: props.location.state ? props.location.state.book : null,
      comments: [],
    };
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  handleComment = (comment) => {

    this.setState(function (previousState) {
      let commentsUpdated = previousState.comments;
      commentsUpdated.push(comment);

      return {
        comments: commentsUpdated
      };
    });
  };

  componentDidMount() {
    // 如果当前是直接访问当前了链接，而不是从点击链接传递过来书籍数据，那么则根据 book 的 _id 来从数据库中请求数据
    if (!this.state.book) {
      // 从本地服务端获取数据库中的本书的数据
      fetch(`/api/share/book/${this.props.params.id}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        }
      }).then(function (response) {
        return response.json();
      }).then(function (json) {

        this.setState(function (previousState) {

          return {
            // 将从本服务端获取到的 book 数据与 this.state 中已经存在的 book 合并并更新到 this.state 中去
            book: Object.assign({}, previousState, json.book)
          };

        }, function () { // 更新本地服务器的数据到 state 以后如果数据人不够完整则执行以下步骤

          let book = this.state.book;

          // 如果从 location.state 中没有获取到 book 的详细信息就根据书本的豆瓣 ID 来获取到 book 的详细信息
          if (Object.is(book.book, null)) {

            fetch('http://123.206.6.150:9000/v2/book/' + book.bookId).then(function (response) {
              return response.json();
            }).then(function (json) {

              this.setState(function (previousState) {
                // 将从豆瓣 API 中获取到的数据添加到 book 中并更新到 this.state 中
                let bookUpdated = previousState.book;
                bookUpdated.book = json;
                return {
                  book: bookUpdated
                };
              });

            }.bind(this));

          }
        });
      }.bind(this)); // fetch

    }// if top

  }// componentDidMount

  render() {

    return (
      <div>

        <BookDetailCard
          book={this.state.book}
        />

        <CommentBox
          comments={this.state.comments}
          onComment={this.handleComment}
        />

      </div>
    );
  }

}

export default withStyles(s)(BookDetailPage);
