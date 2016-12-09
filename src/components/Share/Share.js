/**
 * Created by cjh95414 on 2016/5/3.
 */
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ActionSearch from 'material-ui/svg-icons/action/search';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import { ListItem } from 'material-ui/List';
import { darkBlack, lightBlack } from 'material-ui/styles/colors'; // eslint-disable-line

import * as actions from 'actions/Share';

import SelectableList from 'components/common/SelectableList';

import s from './Share.scss';

function getStyles() {
  return {
    smallIcon: { width: 36, height: 36 },
    small: { width: 72, height: 72, padding: 16 },
    dialogContent: { width: '100%', maxWidth: 'none' },
    avatar: { borderRadius: 0, height: '55px', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' },
  };
}

class Share extends Component {

  state = {
    openSearchDialog: false,
    openAlertDialog: false,
    bookTitle: '',
    shareTitle: '',
    shareContent: '',
    detail: null,
    selectedIndex: 0,
  };

  handleOpenSearchDialog = () => {
    // the text which user inputted
    const { actions: { searchFromDouban } } = this.props;
    const { bookTitle } = this.state;

    searchFromDouban(bookTitle)
      .then(() => {
        this.setState({
          openSearchDialog: true,
        });
      });
  };

  // just be used to set the state for close the dialog
  handleCloseDialog = () => {
    this.setState({
      openSearchDialog: false,
    });
  };

  handleCancelDialog = () => {
    this.handleCloseDialog();
    this.setState({
      bookSearchResult: [],
    });
  };

  handleBookTitleChange = (event, value) => {
    this.setState({
      bookTitle: value,
    });
  };

  handleShareTitleChange = (event, value) => {
    this.setState({
      shareTitle: value,
    });
  };

  handleShareContentChange = (event, value) => {
    this.setState({
      shareContent: value,
    });
  };

  handleSelectBook = (index) => {
    this.setState({
      selectedIndex: index,
    });
  };

  handleConfirmDialog = () => {
    const { selectedIndex } = this.state;
    const { bookSearchResult } = this.props;

    const detail = bookSearchResult.get(selectedIndex);

    this.setState({
      detail,
      bookTitle: detail.get('title'),
    });

    this.handleCloseDialog();
  };

  handleSubmitForm = (event) => {
    event.preventDefault();

    // the data will be posted to server
    const { actions: { create } } = this.props;
    const { detail, bookTitle, shareTitle, shareContent } = this.state;

    const data = {
      detail,
      bookTitle,
      shareTitle,
      shareContent,
    };

    // interact with the server and post the "share" to server then handle returned result.
    create(data)
      .then(() => {
        this.handleCloseDialog();
      });
  };

  // an alert dialog that remind user who have post submit successfully.
  handleOpenAlertDialog = () => {
    this.setState({
      openAlertDialog: true,
    });

    // 2000ms later, the view switched to homepage.
    setTimeout(() => {
      this.props.router.push('/');
    }, 2000);
  };

  render() {
    const { bookSearchResult } = this.props;
    const { bookTitle, shareTitle, shareContent, openSearchDialog, openAlertDialog } = this.state;
    const styles = getStyles();

    const dialogActions = [
      <FlatButton
        label="取消"
        onTouchTap={this.handleCancelDialog}
      />,
      <FlatButton
        secondary
        keyboardFocused
        label="确认"
        onTouchTap={this.handleConfirmDialog}
      />,
    ];

    const listItems = bookSearchResult.map((book, index, array) => [
      <ListItem
        key={book.get('title') + book.get('author')}
        value={index}
        leftAvatar={<Avatar style={styles.avatar} src={book.get('image')} />}
        primaryText={book.get('title')}
        secondaryText={
          <p>
            <span style={{ color: darkBlack }}>{book.get('author')}</span>
            <br />
            {book.get('publisher')}
          </p>
          }
        secondaryTextLines={2}
      />,
      index + 1 < array.length && <Divider inset />,
    ]).toArray();

    return (
      <div className={s.root}>
        <form onSubmit={this.handleSubmitForm} method="post" action="/manage/share/add">
          <div className={s.bookInputContainer}>
            <TextField
              fullWidth
              key="bookTitle"
              value={bookTitle}
              hintText="告诉大家您想分享的书籍~"
              floatingLabelText="书籍名称"
              onChange={this.handleBookTitleChange}
            />
            <div className={s.iconSearch}>
              <IconButton
                iconStyle={styles.smallIcon}
                style={styles.small}
                onTouchTap={this.handleOpenSearchDialog}
              >
                <ActionSearch />
              </IconButton>
            </div>
          </div>

          <TextField
            fullWidth
            key="shareTitle"
            hintText="给您的分享一个具有极大吸引力的标题吧~"
            floatingLabelText="分享标题"
            value={shareTitle}
            onChange={this.handleShareTitleChange}
          />

          <TextField
            fullWidth
            multiLine
            key="shareContent"
            hintText="将这本令你禁不住分享的书籍中您觉得的很棒的推荐理由告诉大家吧……"
            style={{ marginTop: '1rem' }}
            value={shareContent}
            onChange={this.handleShareContentChange}
          />

          <div className={s.fixBottom}>
            <RaisedButton
              primary
              label="分享"
              type="submit"
              style={{ width: '100%' }}
            />
          </div>

        </form>

        <Dialog
          modal
          key="searchResult"
          title="书籍搜索结果"
          contentStyle={styles.dialogContent}
          actions={dialogActions}
          open={openSearchDialog}
          onRequestClose={this.handleCancelDialog}
          autoScrollBodyContent
        >
          <SelectableList onSelected={this.handleSelectBook}>
            {listItems}
          </SelectableList>
        </Dialog>

        <Dialog
          modal
          key="submitResult"
          open={openAlertDialog}
        >
          分享成功
        </Dialog>

      </div>
    );
  }
}

export default connect(({ share }) => ({
  bookSearchResult: share.get('bookSearchResult'),
}), dispatch => ({
  actions: bindActionCreators(Object.assign({}, actions), dispatch),
}))(withStyles(s)(withRouter(Share)));
