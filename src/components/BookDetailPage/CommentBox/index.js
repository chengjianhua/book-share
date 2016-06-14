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
import {grey400, darkBlack, grey300} from "material-ui/styles/colors";
import IconButton from "material-ui/IconButton";
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./index.scss";

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
      openCommentDialog: false,
      comment: '',
    };
  }

  static propTypes = {
    user: PropTypes.shape({
      avatar: PropTypes.string,
      username: PropTypes.string,
    }),
    onComment: PropTypes.func,
    comments: PropTypes.array
  };

  static defaultProps = {
    user: {
      avatar: '/img/avatar.png',
      username: 'chengjianhua',
    },
  };

  handleCommentDialogOpen = () => {
    this.setState({
      openCommentDialog: true
    });
  };

  handleCommentDialogClose = () => {
    this.setState({
      openCommentDialog: false
    });
  };

  handleCommentDialogConfirm = () => {
    this.handleCommentDialogClose();

    this.props.onComment && this.props.onComment(this.state.comment);
  };

  handleCommentChange = (event, value) => {
    this.setState({
      comment: value,
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
        onTouchTap={this.handleCommentDialogConfirm}
      />
    ];
    // --------对话框的按钮-----------

    const props = this.props;

    // 根据评论数据生成评论列表
    const commentList = this.props.comments.map(function (comment, index) {
      return ([
        <ListItem
          key={index}
          leftAvatar={<Avatar src={props.user.avatar} />}
          rightIconButton={rightIconMenu}
          primaryText={
            <p>
              {props.user.username}
              <span style={{color: grey300, fontSize: '0.5rem'}}> {new Date(comment.date).toDateString()}</span> <br />
            </p>
          }
          secondaryText={
            <p>
              {comment.content}
            </p>
          }
          secondaryTextLines={2}
        />,
        <Divider inset={true}/>
      ]);
    });

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
          <Subheader>{this.props.comments.length} 条评论 </Subheader>
          {commentList}
        </List>

        <Dialog
          key="add_comment"
          title="请输入您的评论"
          contentStyle={styles.commentDialogContent}
          actions={dialogActions}
          modal={true}
          open={this.state.openCommentDialog}
          autoScrollBodyContent={true}
        >
          <TextField
            hintText="不超过100个字"
            fullWidth={true}
            multiLine={true}
            rows={5}
            rowsMax={8}
            value={this.state.comment}
            onChange={this.handleCommentChange}
          />
        </Dialog>

      </div>
    );
  }
}

export default withStyles(s)(CommentBox);
