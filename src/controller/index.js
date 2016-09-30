/**
 * Created by cjh95414 on 2016/6/1.
 */
import express from 'express';
import log4js from 'log4js';
import jwt from 'jsonwebtoken';

import {auth} from '../config';
import Book from '../model/Book';
import User from '../model/User';

import {formatJson} from './utils';
import {authenticateToken} from './middlewares';

const logger = log4js.getLogger('controller/index.js');

const router = new express.Router();

router.use(authenticateToken.unless({
  useOriginalUrl: false,
  path: ['/register', '/authenticate'],
}));

/**
 * [ share/add ]： 处理添加分享的请求
 */
router.post('/share/add', (req, res) => {
  const {username} = req.user;

  // 请求中传入的数据
  const {detail, bookTitle, shareTitle, shareContent} = req.body;

  // 将要插入的数据
  const share = {
    bookId: detail ? detail.id : null,
    bookTitle,
    shareTitle,
    shareContent,
    username,
  };

  Book.addShareBook(share, (result) => {
    logger.info(`[ObjectId = ${result.insertedId}]: Inserted a book into mongodb.`);
    res.json(formatJson(true, 'Add a book share successfully.', {
      id: result.insertedId,
    }));
  });
});

router.post('/comment/add/:id', (req, res) => {
  const shareId = req.params.id;
  const comment = Object.assign({}, req.body, {user: req.user.username});

  Book.addComment(shareId, comment, (result) => {
    if (!!result) {
      res.json(formatJson(true, `Comment on book:${shareId} successfully.`));
    } else {
      res.json(formatJson(false, `Comment on book:${shareId} failed.`));
    }
  });
});


/**
 * [ /register ]: 注册用户
 */
router.post('/register', (req, res) => {
  const {username, password} = req.body;
  const user = {
    username,
    password,
    registerDate: new Date(),
  };

  User.addUser(user, (result) => {
    logger.info(`[ObjectId = ${result.insertedId}]: Inserted [${JSON.stringify(user)}] into mongodb!`);

    res.json(formatJson(true, `User ${username} registerd successfully.`));
  });
});

router.post('/authenticate', (req, res) => {
  const {secret} = auth.jwt;
  const {username, password} = req.body;
  User.findUniqueUserByUsername(username, (err, user) => {
    if (err) {
      logger.error(`Fetching user named ${username} from database failed.`);
      throw err;
    }
    if (!user) {
      res.status(400).json({
        success: false,
        message: 'Authentication failed. User not found.',
      });
    } else {
      if (user.password !== password) {
        res.statue(400).json({
          success: false,
          message: 'Authentication failed. Wrong password.',
        });
      } else {
        const payload = {
          username: user.username,
          signature: user.signature,
          gender: user.gender,
          id: user._id,
        };

        const token = jwt.sign(payload, secret, {
          expiresIn: '1 days',
        });

        res.json({
          success: true,
          message: 'Enjoy yourself in this awesome app.',
          token,
          profile: payload,
        });
      }
    }
  });
});

export default router;
