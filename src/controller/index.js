/**
 * Created by cjh95414 on 2016/6/1.
 */
import express from 'express';
import log4js from 'log4js';

import Book from '../model/Book';
import User from '../model/User';

import {formatJson} from './utils';
import {authenticateToken} from './middlewares';
import passport from '../core/passport';

const logger = log4js.getLogger('controller/index.js');

const router = new express.Router();

router.use(authenticateToken.unless({
  useOriginalUrl: false,
  path: ['/register', '/authenticate'],
}));


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

router.post('/authenticate', passport.authenticate('local'), (req, res) => {
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
        res.redirect('/');
      }
    }
  });
});

export default router;
