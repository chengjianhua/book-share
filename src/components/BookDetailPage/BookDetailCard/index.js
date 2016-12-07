/**
 * Created by cjh95414 on 2016/6/13.
 */
import React, { PropTypes, PureComponent } from 'react';
import { Card, CardText, CardTitle, CardMedia, CardHeader } from 'material-ui/Card';
import loadingGif from '../../../public/img/loading.gif';

class BookDetailCard extends PureComponent {

  static propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string,
      signature: PropTypes.string,
      avatar: PropTypes.string,
    }),
    book: PropTypes.object,
  };

  render() {
    const loading = '加载中……';
    const { user, book } = this.props;

    const bookTitle = book.get('bookTitle');
    const bookShareTitle = book.get('shareTitle');
    const bookShareContent = book.get('shareContent');
    const bookSummary = book.getIn(['detail', 'summary']);
    const bookImg = book.getIn(['detail', 'images', 'large']);

    const username = user.get('username');
    const signature = user.getIn(['profile', 'signature']);
    const avatar = '/img/avatar.png';

    return (
      <div>
        <Card>
          <CardHeader
            title={username}
            subtitle={signature}
            avatar={avatar}
          />

          <CardMedia
            overlay={
              <CardTitle
                title={bookTitle || loading}
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
