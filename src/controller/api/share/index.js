import express from 'express';
import log4js from 'log4js';

import Book from '../../../model/Book';
import {authenticateToken} from '../../middlewares';
import {formatJson} from '../../utils';

const logger = log4js.getLogger('/api/share/');
const shareRouter = new express.Router();

shareRouter.use(authenticateToken.unless({
  useOriginalUrl: false,
  path: ['/books', /\/book\/\w+/g],
}));

/**
 * [ share/add ]： 处理添加分享的请求
 */
shareRouter.post('/add', (req, res) => {
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

shareRouter.get('/books', (req, res) => {
  const {page} = req.query;

  Book.getSharedBooksWithAll({page: Number(page)}, (books) => {
    res.json(formatJson(true, `Fetching books page No.${page} successfully.`, {
      books,
    }));
  });
});

shareRouter.get('/book/:id', (req, res) => {
  const {id} = req.params;

  Book.getSharedBookByShareId(id, (book) => {
    res.json(formatJson(true, `Fetching book: ${id} successfully.`, {
      book,
    }));
  });
});

export default shareRouter;
