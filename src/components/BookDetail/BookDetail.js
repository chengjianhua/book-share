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

  static propTypes = {
    avatar: PropTypes.string,
    username: PropTypes.string,
    comment: PropTypes.string
  };

  static defaultProps = {
    avatar: 'http://www.material-ui.com/images/ok-128.jpg',
    username: 'Brendan Lim',
    comment: 'I\'ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?'
  };

  //noinspection JSMethodCanBeStatic
  render() {

    let commentList = [];

    for (let i = 0; i < 10; i++) {
      commentList.push(
        <ListItem
          key={`listItem${i}`}
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
        />
      );

      commentList.push(
        <Divider key={`divider${i}`} inset={true}/>
      );

    }

    return (
      <div>
        <BookCard />

        <List>
          <Subheader>10 条评论 </Subheader>
          {commentList}
        </List>
      </div>
    );
  }

}

export default withStyles(s)(BookDetail);
