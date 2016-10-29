/**
 * Created by cjh95414 on 2016/6/13.
 */
import React, {PropTypes, Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, grey300} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './index.scss';

const iconButtonElement = (
  <IconButton
    touch
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
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
    comments: PropTypes.array,
  };

  static defaultProps = {
    user: {
      avatar: '/img/avatar.png',
      username: 'chengjianhua',
    },
  };

  handleCommentDialogOpen = () => {
    this.setState({
      openCommentDialog: true,
    });
  };

  handleCommentDialogClose = () => {
    this.setState({
      openCommentDialog: false,
    });
  };

  handleCommentDialogConfirm = () => {
    this.handleCommentDialogClose();

    const {onComment} = this.props;

    onComment && onComment(this.state.comment); // eslint-disable-line
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
        keyboardFocused
        secondary
        onTouchTap={this.handleCommentDialogConfirm}
      />,
    ];
    // --------对话框的按钮-----------

    const {comments, user} = this.props;

    // 根据评论数据生成评论列表
    const commentList = comments.map((comment, index) => [
      <ListItem
        key={index}
        leftAvatar={<Avatar src={user.avatar} />}
        rightIconButton={rightIconMenu}
        primaryText={
          <p>
            {user.username}
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
      <Divider inset />,
    ]);

    return (
      <div className={s.commentRoot}>

        <div className={s.commentButton}>
          <RaisedButton
            label="评论"
            labelPosition="after"
            primary
            icon={<FontIcon className="material-icons">comment</FontIcon>}
            onTouchTap={this.handleCommentDialogOpen}
          />
        </div>

        <List>
          <Subheader>{comments.length} 条评论 </Subheader>
          {commentList}
        </List>

        <Dialog
          key="add_comment"
          title="请输入您的评论"
          contentStyle={styles.commentDialogContent}
          actions={dialogActions}
          modal
          open={this.state.openCommentDialog}
          autoScrollBodyContent
        >
          <TextField
            hintText="不超过100个字"
            fullWidth
            multiLine
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
