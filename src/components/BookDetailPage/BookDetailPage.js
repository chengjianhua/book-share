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
      book: props.location.state ? props.location.state.book ? props.location.state.book : null : null,
    };
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  handleComment = (commentContent) => {

    const commentObject = {
      content: commentContent,
      user: 'chengjianhua',
      date: new Date(),
    };

    // 将评论提交到服务器
    fetch(`/manage/comment/add/${this.props.params.id}`, {
      method: 'POST',
      body: JSON.stringify(commentObject),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(function (response) {
      return response.json();
    }).then(function (json) {

      // 如果评论成功提交到了服务器
      if (json.isSuccess) {
        // 将当前的评论内容直接添加到评论列表的末尾
        this.setState(function (previousState) {
          let bookUpdated = previousState.book;
          bookUpdated.comments.push(commentObject);

          return {
            book: bookUpdated
          };
        });
        // this.setState: comments updated
      }

    }.bind(this));
    // 评论提交到服务器

  };

  componentDidMount() {

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
          book: Object.assign({}, previousState.book, json.book),
        };

      }, function () { // 更新本地服务器的数据到 state 以后如果数据 book 数据不够完整则执行以下步骤

        let book = this.state.book;

        // 如果从 location.state 中没有获取到 book 的详细信息就根据书本的豆瓣 ID 来获取到 book 的详细信息
        if (!book.detail) {

          // fetch
          fetch('http://123.206.6.150:9000/v2/book/' + book.bookId).then(function (response) {
            return response.json();
          }).then(function (detail) {

            this.setState(function (previousState) {
              // 将从豆瓣 API 中获取到的数据添加到 book 中并更新到 this.state 中
              let bookUpdated = previousState.book;
              bookUpdated.detail = detail;
              return {
                book: bookUpdated
              };
            });

          }.bind(this));
          // fetch

        }
        // 获取 book 完整数据结束

      });
    }.bind(this)); // fetch

  }// componentDidMount

  render() {

    const book = this.state.book;

    return (
      <div>

        <BookDetailCard
          book={book}
        />

        <CommentBox
          comments={book? (book.hasOwnProperty('comments') ? book.comments: [])  : []}
          onComment={this.handleComment}
        />

      </div>
    );
  }

}

export default withStyles(s)(BookDetailPage);
