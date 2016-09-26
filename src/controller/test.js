import express from 'express';
import User from '../model/UserTest'; // eslint-disable-line
import jwt from 'jsonwebtoken';
import {auth} from '../config';
import {authenticateToken} from './middlewares';
import unless from 'express-unless';

const router = new express.Router();
router.unless = unless;

router.use(authenticateToken.unless({
  useOriginalUrl: false,
  path: {
    url: '/auth',
  },
}));

router.get('/hello', (req, res) => {
  res.send('Hello! This is a simple test!');
});

router.get('/setup', (req, res) => {
  const chengjianhua = new User({
    name: 'chengjianhua',
    password: '123465',
    admin: true,
  });

  chengjianhua.save((err) => {
    if (err) throw err;
    console.log('User save successfully!'); // eslint-disable-line
    res.json({success: true});
  });
});

router.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    res.json(users);
  });
});

router.post('/auth', (req, res) => {
  const {secret} = auth.jwt;
  const {name, password} = req.body;
  User.findOne({
    name,
  }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.json({
        success: false,
        message: 'Authentication failed. User not found.',
      });
    } else {
      if (user.password !== password) {
        res.send({
          success: false,
          message: 'Authentication failed. Wrong password.',
        });
      } else {
        const payload = {
          name,
          password,
        };
        const token = jwt.sign(payload, secret, {
          expiresIn: 60,
        });

        res.json({
          success: true,
          message: 'You\'re the best power!',
          token,
        });
      }
    }
  });
});

export default router;
