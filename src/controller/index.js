/**
 * Created by cjh95414 on 2016/6/1.
 */
import express from "express";
import passport from "../core/passport";
import Book from '../model/Book';
import User from '../model/User';

var router = express.Router();

/**
 * [ share/add ]： 处理添加分享的请求
 */
router.post('/share/add', function (req, res) {
  // 定义将要返回的数据
  let returnData = {
    isSuccess: true,
  };

  // 请求中传入的数据
  let data = req.body;

  // 将要插入的数据
  let share = {
    bookId: data.book ? data.book.id : null,
    bookTitle: data.bookTitle,
    shareTitle: data.shareTitle,
    shareContent: data.shareContent
  };

  Book.addShareBook(share, function (result) {
    returnData.id = result.insertedId;
    console.log(`[ObjectId = ${result.insertedId}]: Inserted ${JSON.stringify(share)} into mongodb!`);
    res.end(JSON.stringify(returnData));
  })

});


/**
 * [ /register ]: 注册用户
 */

router.post('/register', function (req, res) {

  console.log("The handler to handle [ /register ] has been triggered!");

  let data = req.body,
    user = {
      username: data.username,
      password: data.password,
      registerDate: new Date(),
    },
    returnData = {};

  User.addUser(user, function (result) {
    returnData.id = result.insertedId;
    returnData.isSuccess = true;

    console.log(`[ObjectId = ${result.insertedId}]: Inserted [${JSON.stringify(user)}] into mongodb!`);

    res.end(JSON.stringify(returnData));
  });

});

router.post('/login',
  passport.authenticate('local'),
  function (req, res) {

    let returnData = {
      isSuccess: true
    };

    res.send(JSON.stringify(returnData));

  });

export default router;


