/**
 * Created by cjh95414 on 2016/6/11.
 */

import express from 'express';
import Book from '../model/Book';
import User from '../model/User'; // eslint-disable-line

const router = new express.Router();

router.get('/share/books', (req, res) => {
  const {page} = req.query;
  const returnData = {};

  Book.getSharedBooksWithAll({page: Number(page)}, (books) => {
    returnData.books = books;

    res.send(JSON.stringify(returnData));
  });
});


router.get('/share/book/:id', (req, res) => {
  const returnData = {};

  Book.getSharedBookByShareId(req.params.id, (book) => {
    returnData.book = book;

    res.send(JSON.stringify(returnData));
  });
});

router.get('/:username/share/books', (req, res) => {
  const returnData = {};

  Book.getShareBookSByUsername(req.params.username, (books) => {
    returnData.books = books;

    res.end(JSON.stringify(returnData));
  });
});

export default router;
