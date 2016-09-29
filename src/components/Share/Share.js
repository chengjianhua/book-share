/**
 * Created by cjh95414 on 2016/5/3.
 */
import React, {PropTypes, Component} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ActionSearch from 'material-ui/svg-icons/action/search';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {darkBlack, lightBlack} from 'material-ui/styles/colors';

import {ListItem} from 'material-ui/List';

import SelectableList from '../common/SelectableList';

import 'es6-promise';
import fetch from 'isomorphic-fetch';

import s from './Share.scss';

function getStyles() {
  return {
    smallIcon: {width: 36, height: 36},
    small: {width: 72, height: 72, padding: 16},
    dialogContent: {width: '100%', maxWidth: 'none'},
    avatar: {borderRadius: 0, height: '55px', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'},
  };
}

class Share extends Component {

  constructor(props) {
    super(props);

    this.state = {
      openSearchDialog: false,
      openAlertDialog: false,
      bookSearchResult: [],
      bookTitle: '',
      shareTitle: '',
      shareContent: '',
      detail: null,
      selectedIndex: 0,
    };
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  handleOpenSearchDialog = () => {
    // the text which user inputted
    const searchText = this.state.bookTitle;

    fetch(`http://123.206.6.150:9000/v2/book/search?q=${searchText}`, {
      mode: 'cors',
    }).then(function (response) {
      return response.json();
    }).then(function (json) {
      // if fetch the books' data correctly, then store the result list of search.
      if (!json.msg) {
        this.setState({
          bookSearchResult: json.books,
        });
      } else {
        // if fetch the books' data incorrectly, the json data will contain a property 'msg', it's the error info.
        console.log('Fetching data failed!');
      }
    }.bind(this)).catch(function (ex) {
      console.log('parsing failed', ex);
    });

    this.setState({
      openSearchDialog: true,
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
    let selectedIndex = this.state.selectedIndex;

    console.log(selectedIndex);

    let detail = this.state.bookSearchResult[selectedIndex];

    this.setState({
      detail,
      bookTitle: detail.title,
    });

    this.handleCloseDialog();
  };


  handleSubmitForm = (event) => {
    event.preventDefault();

    // the data will be posted to server
    let data = {
      detail: this.state.detail,
      bookTitle: this.state.bookTitle,
      shareTitle: this.state.shareTitle,
      shareContent: this.state.shareContent,
    };

    // interact with the server and post the "share" to server then handle returned result.
    fetch('/manage/share/add', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      // If server return a message that indicates the submit is successful, then switching to homepage.
      if (data.isSuccess) {
        this.handleOpenAlertDialog();
      }
    }.bind(this)).catch(function (ex) {
      console.log('提交分享表单失败', ex);
    });
  };

  // an alert dialog that remind user who have post submit successfully.
  handleOpenAlertDialog = () => {
    this.setState({
      openAlertDialog: true,
    });

    // 2000ms later, the view switched to homepage.
    setTimeout(function () {
      this.context.router.push('/');
    }.bind(this), 2000);
  };

  render() {
    let styles = getStyles();

    const dialogActions = [
      <FlatButton
        label="取消"
        onTouchTap={this.handleCancelDialog}
      />,
      <FlatButton
        label="确认"
        keyboardFocused
        secondary
        onTouchTap={this.handleConfirmDialog}
      />,
    ];

    const listItems = this.state.bookSearchResult.map(function (book, index, array) {
      return ([
        <ListItem
          key={index}
          value={index}
          leftAvatar={<Avatar style={styles.avatar} src={book.image} />}
          primaryText={book.title}
          secondaryText={
              <p>
                <span style={{color: darkBlack}}>{book.author}</span>
                  <br />
                  {book.publisher}
              </p>
            }
          secondaryTextLines={2}
        />,
        index + 1 < array.length && <Divider inset />,
      ]);
    });

    return (
      <div className={s.root}>
        <form onSubmit={this.handleSubmitForm} method="post" action="/manage/share/add">
          <div className={s.bookInputContainer}>
            <TextField
              key="bookTitle"
              value={this.state.bookTitle}
              hintText="告诉大家您想分享的书籍~"
              floatingLabelText="书籍名称"
              fullWidth
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
            key="shareTitle"
            hintText="给您的分享一个具有极大吸引力的标题吧~"
            floatingLabelText="分享标题"
            fullWidth
            value={this.state.shareTitle}
            onChange={this.handleShareTitleChange}
          />

          <TextField
            key="shareContent"
            hintText="将这本令你禁不住分享的书籍中您觉得的很棒的推荐理由告诉大家吧……"
            fullWidth
            multiLine
            style={{marginTop: '1rem'}}
            value={this.state.shareContent}
            onChange={this.handleShareContentChange}
          />

          <div className={s.fixBottom}>
            <RaisedButton
              label="分享"
              primary
              type="submit"
              style={{width: '100%'}}
            />
          </div>

        </form>

        <Dialog
          key="searchResult"
          title="书籍搜索结果"
          contentStyle={styles.dialogContent}
          actions={dialogActions}
          modal
          open={this.state.openSearchDialog}
          onRequestClose={this.handleCancelDialog}
          autoScrollBodyContent
        >
          <SelectableList ref="bookList" onSelected={this.handleSelectBook}>
            {listItems}
          </SelectableList>
        </Dialog>

        <Dialog
          key="submitResult"
          modal
          open={this.state.openAlertDialog}
        >
          分享成功
        </Dialog>

      </div>
    );
  }
}

export default withStyles(s)(Share);
