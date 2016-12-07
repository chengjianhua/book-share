import express from 'express';
import log4js from 'log4js';

import Book from 'models/Book';

import { authenticateToken } from '../../middlewares';
import { formatJson } from '../../utils';

const logger = log4js.getLogger('/api/share/');
const shareRouter = new express.Router();

shareRouter.use(authenticateToken().unless({
  useOriginalUrl: false,
  path: ['/books', /\/book\/\w+$/g],
}));

shareRouter.get('/books', (req, res) => {
  const { page = 1 } = req.query;

  Book.getSharedBooksWithAll({ page: Number(page) }, (books) => {
    res.json(formatJson(true, `Fetching books page No.${page} successfully.`, {
      books,
    }));
  });
});

/**
 * [ share/books ]： 处理添加分享的请求
 * @method POST
 */
shareRouter.post('/books', (req, res) => {
  const { username } = req.user;

  // 请求中传入的数据
  const { detail, bookTitle, shareTitle, shareContent } = req.body;

  // 将要插入的数据
  const share = {
    bookId: detail ? detail.id : null,
    bookTitle,
    shareTitle,
    shareContent,
    username,
  };

  Book.addShareBook(share, ({ insertedId: id }) => {
    logger.info(`[ObjectId = ${id}]: Inserted a book into mongodb.`);
    res.json(formatJson(true, 'Add a book share successfully.', {
      id,
    }));
  });
});

shareRouter.get('/books/:id', (req, res) => {
  const { id } = req.params;

  Book.getSharedBookByShareId(id, (book) => {
    res.json(formatJson(true, `Fetching book: ${id} successfully.`, {
      book,
    }));
  });
});

shareRouter.post('/books/:id/comment', (req, res) => {
  const { id } = req.params;
  const comment = Object.assign({}, req.body, { user: req.user.username });

  Book.addComment(id, comment, (result) => {
    if (!!result) {
      res.json(formatJson(true, `Comment on book:${id} successfully.`));
    } else {
      res.json(formatJson(false, `Comment on book:${id} failed.`));
    }
  });
});

shareRouter.post('/books/:id/star/:username', (req, res) => {
  const { username, id: shareId } = req.params;

  Book.star(shareId, username)
    .then(() => {
      res.json(formatJson(true, 'success'));
    })
    .catch(() => {
      res.json(formatJson(false, 'failed'));
    });
});

shareRouter.delete('/books/:id/star/:username', (req, res) => {
  const { username, id: shareId } = req.params;

  Book.unstar(shareId, username)
    .then(() => {
      res.json(formatJson(true, `User ${username} unstar share ${shareId} successfully.`));
    })
    .catch(() => {
      res.json(formatJson(false, `User ${username} unstar share ${shareId} failed.`));
    });
});

export default shareRouter;
