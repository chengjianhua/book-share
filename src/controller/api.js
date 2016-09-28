/**
 * Created by cjh95414 on 2016/6/11.
 */
import express from 'express';
import Book from '../model/Book';
import User from '../model/User'; // eslint-disable-line
import {authenticateToken} from './middlewares';
import {formatJson} from './utils';

const router = new express.Router();

router.use(authenticateToken.unless({
  useOriginalUrl: false,
  path: ['/share/books', '/share/book/:id'],
}));

router.get('/share/books', (req, res) => {
  const {page} = req.query;

  Book.getSharedBooksWithAll({page: Number(page)}, (books) => {
    res.json(formatJson(true, `Fetching books page No.${page} successfully.`, {
      books,
    }));
  });
});

router.get('/share/book/:id', (req, res) => {
  const {id} = req.params;
  const returnData = {};

  Book.getSharedBookByShareId(id, (book) => {
    returnData.book = book;

    res.send(JSON.stringify(returnData));
  });
});

router.get('/accounts/:username/books', (req, res) => {
  const {username} = req.params;

  Book.getShareBookSByUsername(username, (books) => {
    res.json(formatJson(
      true,
      `Get all shared books by ${username} successfully.`, {
        books,
      }
    ));
  });
});

router.get('/accounts/:username/profile', (req, res) => {
  const {username} = req.params;

  User.findUniqueUserByUsername(username, profile => {
    if (!profile) {
      res.status(404).json(formatJson(
        false,
        `Fetch ${username}'s profile failed.'`,
      ));
    } else {
      res.json(formatJson(
        true,
        `Fetch ${username}'s profile successfully.'`,
        profile
      ));
    }
  });
});

export default router;
