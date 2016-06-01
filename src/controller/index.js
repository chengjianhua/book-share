/**
 * Created by cjh95414 on 2016/6/1.
 */
import express from 'express';

import connect from '../database/db';

var router = express.Router();

router.post('/share/add', function (req, res) {
  // 定义将要返回的数据
  let returnData = {
    isSuccess: true,
  };

  // 请求中的数据
  let data = req.body;

  // 将要插入的数据
  let share = {
    bookId: data.book ? data.book.id : null,
    bookTitle: data.bookTitle,
    shareTitle: data.shareTitle,
    shareContent: data.shareContent
  };

  connect.then(function (db) {
    db.collection('share_book').insertOne(share, function (err, result) {
      returnData.id = result.insertedId;

      console.log(`[ObjectId = ${result.insertedId}]: Inserted ${JSON.stringify(share)} into mongodb!`);

      res.end(JSON.stringify(returnData));
    });

  });


});

export default router;


