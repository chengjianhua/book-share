import express from 'express';
import jwt from 'jsonwebtoken';
import log4js from 'log4js';

import shareRouter from './share';
import accountsRouter from './accounts';
import User from '../../model/User';

import {auth} from '../../config';

const logger = log4js.getLogger('api');
const apiRouter = new express.Router();

apiRouter.get('/token', (req, res) => {
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

apiRouter.use('/accounts', accountsRouter);
apiRouter.use('/share', shareRouter);

export default apiRouter;
