import jwt from 'jsonwebtoken';
import unless from 'express-unless';
import log4js from 'log4js';
import {auth} from '../config';

const logger = log4js.getLogger('Authorize');

/* eslint-disable consistent-return */
/* eslint-disable no-else-return */

export function authenticateToken() {
  const middleware = (req, res, next) => {
    const {secret} = auth.jwt;
    let token = '';
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader) {
      const infos = authorizationHeader.split(' ');
      const schema = infos[0];
      token = infos[1];

      if (schema !== 'Bearer') {
        logger.warn(`Wrong schema "${schema}" request header "Authorization".`);
        return res.status(403).json({
          success: false,
          message: `Wrong schema "${schema}" request header "Authorization".`,
        });
      }
    } else {
      token = req.body.token || req.query.token || req.headers['x-access-token'];
    }

    if (token) {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          logger.warn('Token is invalid.');
          return res.status(403).json({
            success: false,
            message: 'Failed to authenticate token.',
          });
        } else {
          /* eslint-disable no-param-reassign */
          req.user = decoded;
          return next();
        }
      });
    } else {
      logger.warn('No token provided.');
      return res.status(403).json({
        success: false,
        message: 'No token provided',
      });
    }
  };

  middleware.unless = unless;

  return middleware;
}
