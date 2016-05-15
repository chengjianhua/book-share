/**
 * Created by cjh95414 on 2016/5/5.
 */


import React, {Component, PropTypes} from "react";
import Card from "material-ui/lib/card/card";
import CardActions from "material-ui/lib/card/card-actions";
import CardHeader from "material-ui/lib/card/card-header";
import CardMedia from "material-ui/lib/card/card-media";
import CardTitle from "material-ui/lib/card/card-title";
import FlatButton from "material-ui/lib/flat-button";
import CardText from "material-ui/lib/card/card-text";

class BookCard extends Component {

  static propTypes = {
    userName: PropTypes.string,
    userSignature: PropTypes.string,
    avatar: PropTypes.string,
    bookName: PropTypes.string,
    bookIntro: PropTypes.string,
    bookImg: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  };

  static defaultProps = {
    userName: '用户昵称',
    userSignature: '个性签名',
    avatar: 'img/avatar.png',
    bookName: '书籍名称',
    bookIntro: '书籍简要介绍',
    bookImg: 'img/background.png',
    title: '分享标题',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.`
  };

  render() {
    return (
      <Card>
        <CardHeader
          title={this.props.userName}
          subtitle={this.props.userSignature}
          avatar={this.props.avatar}
        />
        <CardMedia
          overlay={<CardTitle title={this.props.bookName} subtitle={this.props.bookIntro} />}
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
    );
  }
}

export default BookCard;
