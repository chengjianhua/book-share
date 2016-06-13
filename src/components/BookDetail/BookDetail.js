/**
 * Created by cjh95414 on 2016/5/25.
 */
import React, {PropTypes, Component} from "react";
import {List, ListItem} from "material-ui/List";
import Divider from "material-ui/Divider";
import Subheader from "material-ui/Subheader";
import Avatar from "material-ui/Avatar";
import {grey400} from "material-ui/styles/colors";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import BookCard from "../BookCard";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./BookDetail.scss";

import 'es6-promise';
import fetch from 'isomorphic-fetch';

import loadingGif from '../../public/img/loading.gif';

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400}/>
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Reply</MenuItem>
    <MenuItem>Forward</MenuItem>
    <MenuItem>Delete</MenuItem>
  </IconMenu>
);

class BookDetail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      book: props.location.state ? props.location.state.book : null
    };
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  static propTypes = {
    avatar: PropTypes.string,
    username: PropTypes.string,
    comment: PropTypes.string,
  };


  static defaultProps = {
    avatar: '/img/avatar.png',
    username: 'Author',
    comment: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.`,
  };

  componentDidMount() {
    console.log(this.props.params);
    console.log(this.props);
    console.log(this.context);
    console.log(this.context.router);

    fetch(`/api/share/book/${this.props.params.id}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    }).then(function (response) {
      return response.json();
    }).then(function (json) {
      this.setState(function (previousState) {
        return Object.assign({}, previousState, json.book);
      });
    }.bind(this));
  }

  //noinspection JSMethodCanBeStatic
  render() {

    let commentList = [];
    for (let i = 0; i < 10; i++) {
      commentList.push([
        <ListItem
          key={i}
          leftAvatar={<Avatar src={this.props.avatar} />}
          rightIconButton={rightIconMenu}
          primaryText={this.props.username}
          secondaryText={
            <p>
              {/*<span style={{color: darkBlack}}>Brunch this weekend?</span><br />*/}
              {this.props.comment}
            </p>
          }
          secondaryTextLines={2}
        />,
        <Divider inset={true}/>
      ]);
    }

    let loading = '加载中……',
      book = this.state.book,
      bookDetail = book ? book.book : null;

    return (
      <div>

        <BookCard
          bookName={book? book.bookTitle: loading}
          bookIntro={bookDetail? bookDetail.summary.substr(0,100) + '...': loading}
          bookImg={bookDetail? bookDetail.images.large: loadingGif}
          title={book? book.shareTitle: loading}
          description={book? book.shareContent: loading}
        />

        <List>
          <Subheader>10 条评论 </Subheader>
          {commentList}
        </List>

      </div>
    );
  }

}

export default withStyles(s)(BookDetail);
