/**
 * Created by cjh95414 on 2016/6/11.
 */

import express from "express";
import Book from '../model/Book';
import User from '../model/User';

var router = express.Router();

router.get('/share/books', function (req, res) {
  let {page} = req.body;
  let returnData = {};

  Book.getSharedBooksWithAll({page}, function (books) {
    returnData.books = books;

    res.send(JSON.stringify(returnData));
  });
});


router.get('/share/book/:id', function (req, res) {

  let returnData = {};

  Book.getSharedBookByShareId(req.params.id, function (book) {

    returnData.book = book;

    res.send(JSON.stringify(returnData));
  });
});

router.get('/:username/share/books', function (req, res) {
  let returnData = {};
  
  Book.getShareBookSByUsername(req.params.username, function (books) {
    returnData.books = books;
    
    res.end(JSON.stringify(returnData));
  });
});

export default router;
