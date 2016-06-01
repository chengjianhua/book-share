/**
 * Created by cjh95414 on 2016/5/3.
 */

import React, {PropTypes, Component} from 'react';
import {findDOMNode} from 'react-dom';
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
import BookCard from '../BookCard';

//noinspection NpmUsedModulesInstalled
import 'es6-promise';
//noinspection NpmUsedModulesInstalled
import fetch from 'isomorphic-fetch';

import s from './Share.scss';


function getStyles() {
  return {
    smallIcon: {width: 36, height: 36,},
    small: {width: 72, height: 72, padding: 16,},
    dialogContent: {width: '100%', maxWidth: 'none'},
    avatar: {borderRadius: 0, height: '55px', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'},
  };
}

class Share extends Component {

  constructor(props) {
    super(props);

    this.state = {
      openDialog: false,
      bookSearchResult: [],
      bookInput: '',
      bookId: '',
      shareTitle: '',
      shareContent: '',
      bookDetail: null
    };
  }

  handleOpenDialog = ()=> {
    // the text which user inputted
    const searchText = this.refs.bookInput.input.value;

    fetch(`http://123.206.6.150:9000/v2/book/search?q=${searchText}`, {
      mode: 'cors',
    }).then(function (response) {
      return response.json();
    }).then(function (json) {
      // if fetch the books' data correctly
      if (!json.msg) {
        this.setState({
          bookSearchResult: json.books
        });

      } else {
        // if fetch the books' data incorrectly, the json data will contain a property 'msg', it's the error info
        console.log('Fetching data failed!')
      }

    }.bind(this)).catch(function (ex) {
      console.log('parsing failed', ex)
    });

    this.setState({
      openDialog: true
    });
  };

  handleCloseDialog = () => {
    this.setState({
      openDialog: false,
    });
  };

  handleCancelDialog = ()=> {
    this.handleCloseDialog();
    this.setState({
      bookSearchResult: []
    });
  };

  handleConfirmDialog = ()=> {
    this.handleCloseDialog();

    let selectedIndex = this.refs.bookList.state.selectedIndex;

    this.setState({
      bookDetail: this.state.bookSearchResult[selectedIndex],
    });

    console.log(this.state.bookDetail);
    console.log(this.state.bookSearchResult[selectedIndex]);
  };

  handleSubmitForm = (event) => {
    event.preventDefault();

    console.log('Default submit form action has been prevented!')
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
        keyboardFocused={true}
        secondary={true}
        onTouchTap={this.handleConfirmDialog}
      />
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
                  <br/>
                  {book.publisher}
              </p>
            }
          secondaryTextLines={2}
        />,
        index + 1 < array.length && <Divider inset={true}/>
      ]);

    });

    return (
      <div className={s.root}>
        <form onSubmit={this.handleSubmitForm}>
          <div className={s.bookInputContainer}>
            <TextField
              ref="bookInput"
              hintText="告诉大家您想分享的书籍~"
              floatingLabelText="书籍名称"
              fullWidth={true}
            />
            <div className={s.iconSearch}>
              <IconButton
                iconStyle={styles.smallIcon}
                style={styles.small}
                onTouchTap={this.handleOpenDialog}
              >
                <ActionSearch />
              </IconButton>
            </div>
          </div>

          <TextField
            hintText="给您的分享一个具有极大吸引力的标题吧~"
            floatingLabelText="分享标题"
            fullWidth={true}
          />

          <TextField
            hintText="将这本令你禁不住分享的书籍中您觉得的很棒的推荐理由告诉大家吧……"
            fullWidth={true}
            multiLine={true}
            style={{marginTop: '1rem'}}
          />

          { Object.is(this.state.bookDetail, null) && <BookCard /> }

          <div className={s.fixBottom}>
            <RaisedButton
              label="分享"
              primary={true}
              type="submit"
              style={{width: '100%'}}
            />
          </div>

        </form>
        <Dialog
          title="书籍搜索结果"
          contentStyle={styles.dialogContent}
          actions={dialogActions}
          modal={true}
          open={this.state.openDialog}
          onRequestClose={this.handleCancelDialog}
          autoScrollBodyContent={true}
        >
          <SelectableList ref="bookList">
            {listItems}
          </SelectableList>
        </Dialog>

      </div>
    );
  }
}

export default withStyles(s)(Share);
