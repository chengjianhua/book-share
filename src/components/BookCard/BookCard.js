/**
 * Created by cjh95414 on 2016/5/5.
 */


import React, {Component, PropTypes} from "react";
import {Link} from 'react-router';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from "material-ui/FlatButton";

import Divider from 'material-ui/Divider';

class BookCard extends Component {

  static propTypes = {
    username: PropTypes.string,
    userSignature: PropTypes.string,
    avatar: PropTypes.string,
    bookName: PropTypes.string,
    bookIntro: PropTypes.string,
    bookImg: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  };

  static defaultProps = {
    username: '用户昵称',
    userSignature: '个性签名',
    avatar: '/img/avatar.png',
    bookName: '书籍名称',
    bookIntro: '书籍简要介绍',
    bookImg: '/img/background.png',
    title: '分享标题',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.`
  };

  render() {

    const subtitleStyle = {
      // overflow: 'hidden',
      // textOverflow: 'ellipsis',
      // whiteSpace: 'nowrap'
    };

    return (
      <div>
        <Card>
          <CardHeader
            title={this.props.username}
            subtitle={this.props.userSignature}
            avatar={this.props.avatar}
          />
          <CardMedia
            overlay={
              <CardTitle
                title={this.props.bookName}
                subtitle={this.props.bookIntro}
                subtitleStyle={subtitleStyle}
              />
            }
          >
            <img src={this.props.bookImg}/>
          </CardMedia>
          <CardTitle title={this.props.title}/>
          <CardText>
            {this.props.description}
          </CardText>
          <CardActions>
            <FlatButton label="收藏"/>
            <FlatButton label="查看"/>
          </CardActions>
        </Card>

        <Divider />
      </div>
    );
  }
}

export default BookCard;
