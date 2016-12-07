/**
 * Created by cjh95414 on 2016/5/5.
 */
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';

import FontIcon from 'material-ui/FontIcon';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ComunicateComment from 'material-ui/svg-icons/communication/comment';

import { grey500, blue500 } from 'material-ui/styles/colors';

import s from './BriefShareCard.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import loadingGif from '../../../public/img/loading.gif';

class BriefShareCard extends Component {

  static propTypes = {
    username: PropTypes.string.isRequired,
    bookName: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    commentsCount: PropTypes.number.isRequired,
  };

  // static defaultProps = {
  //   username: '用户昵称',
  //   userSignature: '个性签名',
  //   avatar: '/img/avatar.png',
  //   bookName: '书籍名称',
  //   bookIntro: '书籍简要介绍',
  //   bookImg: '/img/background.png',
  //   title: '分享标题',
  //   description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  //         Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
  //         Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
  //         Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.`,
  // };

  render() {
    const style = {
      actions: {
        label: {
          color: '#A8AAAB',
        },
      },
      root: {
        margin: '0.5rem 0',
      },
      subheader: {
        color: grey500,
        fontSize: '0.85rem',
      },
      username: {
        color: blue500,
      },
    };

    const { username, img, bookName, title, content, commentsCount } = this.props;
    return (
      <Paper style={style.root}>
        <div className={s.root}>
          <div className={s.imgBox}>
            <img className={s.img} src={img || loadingGif} />
          </div>
          <div className={s.contentBox}>
            <div className={s.header}>
              <p>{title}</p>
              <p style={style.subheader}>
                <span style={style.username}>{username}</span> 分享了 <span>"{bookName}"</span>
              </p>
            </div>

            <div className={s.content} style={{ color: grey500 }}>
              {content}
            </div>
          </div>
        </div>
        <div className={s.iconContainer}>
          <FlatButton
            className={s.iconButton}
            label={`${10} 喜欢`}
            labelStyle={style.actions.label}
            icon={<ActionThumbUp color="#A8AAAB" />}
          />
          <FlatButton
            className={s.iconButton}
            label={`${commentsCount} 评论`}
            labelStyle={style.actions.label}
            icon={<ComunicateComment color="#A8AAAB" />}
          />
        </div>
      </Paper>
    );
  }
}

export default withStyles(s)(BriefShareCard);
