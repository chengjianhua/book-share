/**
 * Created by cjh95414 on 2016/6/1.
 */
import express from 'express';
import passport from '../core/passport';
import Book from '../model/Book';
import User from '../model/User';

const router = new express.Router();

/**
 * [ share/add ]： 处理添加分享的请求
 */
router.post('/share/add', (req, res) => {
  // console.log(req.user);
  //
  // console.log(req.sessionStore);
  // console.log(req.session);
  // console.log(req.session.passport.user);
  // console.log(req.sessionID);

  // 定义将要返回的数据
  const returnData = {
    isSuccess: true,
  };

  // 请求中传入的数据
  const data = req.body;

  // 将要插入的数据
  const share = {
    bookId: data.detail ? data.detail.id : null,
    bookTitle: data.bookTitle,
    shareTitle: data.shareTitle,
    shareContent: data.shareContent,
    username: req.user || 'chengjianhua',
  };

  Book.addShareBook(share, (result) => {
    returnData.id = result.insertedId;
    console.log(`[ObjectId = ${result.insertedId}]: Inserted ${JSON.stringify(share)} into mongodb!`);
    res.end(JSON.stringify(returnData));
  });
});

router.post('/comment/add/:id', (req, res) => {
  const shareId = req.params.id;
  const commentObject = req.body;
  const returnData = {};

  Book.addComment(shareId, commentObject, (result) => {
    returnData.isSuccess = !!result;

    res.send(JSON.stringify(returnData));
  });
});


/**
 * [ /register ]: 注册用户
 */
router.post('/register', (req, res) => {
  console.log('The handler to handle [ /register ] has been triggered!');

  const {username, password} = req.body;
  const user = {
    username,
    password,
    registerDate: new Date(),
  };
  const returnData = {};

  User.addUser(user, (result) => {
    returnData.id = result.insertedId;
    returnData.isSuccess = true;

    console.log(`[ObjectId = ${result.insertedId}]: Inserted [${JSON.stringify(user)}] into mongodb!`);

    res.end(JSON.stringify(returnData));
  });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  console.log('-------------------- req.user -----------------------');
  console.log(req.user);
  console.log('-------------------- req.user -----------------------');


  console.log('%c-------------------- req.session -----------------------', {color: 'green'});
  console.log(req.session);
  console.log('-------------------- req.session -----------------------');

  const returnData = {
    isSuccess: true,
    user: req.user,
    token: req.sessionID,
  };

  res.send(JSON.stringify(returnData));
});


router.get('/test/1', (req, res) => {
  console.log(req.user);

  console.log(req.sessionStore);
  console.log(req.session.passport.user);

  res.send(JSON.stringify({message: '/test/1'}));
});

router.get('/test/2', passport.authenticateMiddleware(), (req, res) => {
  console.log(req.user);

  console.log(req.sessionStore);
  console.log(req.session.passport.user);

  res.send(JSON.stringify({message: '/test/2'}));
});

router.get('/test/3', passport.authenticate('local'), (req, res) => {
  console.log(req.user);

  console.log(req.sessionStore);
  console.log(req.session.passport.user);

  res.send(JSON.stringify({message: '/test/3'}));
});

export default router;
