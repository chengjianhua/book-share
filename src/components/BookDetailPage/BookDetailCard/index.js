/**
 * Created by cjh95414 on 2016/6/13.
 */

import React, {PropTypes, Component} from "react";
import {Card, CardText, CardTitle, CardActions, CardMedia, CardHeader} from "material-ui/Card";
import FontIcon from "material-ui/FontIcon";
import RaisedButton from "material-ui/RaisedButton";
import loadingGif from "../../../public/img/loading.gif";
// import s from "./index.scss";

class BookDetailCard extends Component {

  static propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string,
      signature: PropTypes.string,
      avatar: PropTypes.string
    }),
    book: PropTypes.object,
  };

  static defaultProps = {
    user: {
      username: 'chengjianhua',
      signature: 'To be or not to be!',
      avatar: '/img/avatar.png'
    },
  };

  render() {
    const loading = '加载中……';
    const user = this.props.user;
    const book = this.props.book;
    const bookDetail = book ? book.detail : null;

    return (
      <div>
        <Card>
          <CardHeader
            title={user.username}
            subtitle={user.signature}
            avatar={user.avatar}
          />
          <CardMedia
            overlay={
              <CardTitle
                title={book? book.bookTitle: loading}
                subtitle={bookDetail && bookDetail.summary? bookDetail.summary.substr(0,100).concat('……'): loading}
              />
            }
          >
            <img src={bookDetail ? bookDetail.images.large: loadingGif}/>
          </CardMedia>

          <CardTitle title={book? book.shareTitle: loading}/>

          <CardText>
            {book ? book.shareContent : loading}
          </CardText>

        </Card>

      </div>
    );
  }

}

export default BookDetailCard;
