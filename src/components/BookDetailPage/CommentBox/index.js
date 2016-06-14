/**
 * Created by cjh95414 on 2016/6/13.
 */

import React, {PropTypes, Component} from "react";
import {List, ListItem} from "material-ui/List";
import Dialog from 'material-ui/Dialog';
import Divider from "material-ui/Divider";
import Subheader from "material-ui/Subheader";
import TextField from 'material-ui/TextField';
import Avatar from "material-ui/Avatar";
import {grey400} from "material-ui/styles/colors";
import IconButton from "material-ui/IconButton";
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./index.scss";
import "es6-promise";
// import fetch from "isomorphic-fetch";

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

const styles = {
  commentDialogContent: {
    width: '100%',
    maxWidth: 'none',
  },

};

class CommentBox extends Component {

  constructor(props) {
    super(props);

    this.state = {
      openCommentDialog: false
    };
  }

  static propTypes = {
    avatar: PropTypes.string,
    username: PropTypes.string,
    comment: PropTypes.string,
  };

  static defaultProps = {
    avatar: '/img/avatar.png',
    username: '评论者',
    comment: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.`,
  };

  handleCommentDialogClose = () => {
    this.setState({
      openCommentDialog: false
    })
  };

  handleCommentDialogOpen = () => {
    this.setState({
      openCommentDialog: true
    });
  };

  render() {

    // --------对话框的按钮-----------
    const dialogActions = [
      <FlatButton
        label="取消"
        onTouchTap={this.handleCommentDialogClose}
      />,
      <FlatButton
        label="确认"
        keyboardFocused={true}
        secondary={true}
        onTouchTap={this.handleCommentDialogClose}
      />
    ];
    // --------对话框的按钮-----------

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

    return (
      <div className={s.commentRoot}>

        <div className={s.commentButton}>
          <RaisedButton
            label="评论"
            labelPosition="after"
            primary={true}
            icon={<FontIcon className="material-icons">comment</FontIcon>}
            onTouchTap={this.handleCommentDialogOpen}
          />
        </div>

        <List>
          <Subheader>10 条评论 </Subheader>
          {commentList}
        </List>

        <Dialog
          key="add_comment"
          title="请输入您的评论"
          contentStyle={styles.commentDialogContent}
          actions={dialogActions}
          modal={true}
          open={this.state.openCommentDialog}
          onRequestClose={this.handleCommentDialogClose}
          autoScrollBodyContent={true}
        >
          <TextField
            hintText="不超过100个字"
            fullWidth={true}
            multiLine={true}
            rows={5}
            rowsMax={8}
          />
        </Dialog>

      </div>
    );
  }
}

export default withStyles(s)(CommentBox);
