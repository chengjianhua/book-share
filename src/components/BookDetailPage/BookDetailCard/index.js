/**
 * Created by cjh95414 on 2016/6/13.
 */
import React, {PropTypes, Component} from 'react';
import {Card, CardText, CardTitle, CardMedia, CardHeader} from 'material-ui/Card';
import loadingGif from '../../../public/img/loading.gif';
// import s from "./index.scss";

class BookDetailCard extends Component {

  static propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string,
      signature: PropTypes.string,
      avatar: PropTypes.string,
    }),
    book: PropTypes.object,
  };

  static defaultProps = {
    user: {
      username: 'chengjianhua',
      signature: 'To be or not to be!',
      avatar: '/img/avatar.png',
    },
  };

  render() {
    const loading = '加载中……';
    const {user, book} = this.props;
    const bookShareTitle = book.get('shareTitle');
    const bookShareContent = book.get('shareContent');
    const bookSummary = book.getIn(['detail', 'summary']);
    const bookImg = book.getIn(['detail', 'images', 'large']);

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
                title={book.get('bookTitle') || loading}
                subtitle={bookSummary ? bookSummary.substr(0, 100).concat('...') : loading}
              />
            }
          >
            <img src={bookImg || loadingGif} />
          </CardMedia>

          <CardTitle title={bookShareTitle || loading} />

          <CardText>
            {bookShareContent || loading}
          </CardText>
        </Card>
      </div>
    );
  }

}

export default BookDetailCard;
