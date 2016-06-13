/**
 * Created by cjh95414 on 2016/6/11.
 */


import connect from '../database/db';

class Book {

  /**
   *
   * @param share 将要插入的数据
   * @param callback(result) 成功插入数据以后需要执行的操作,参数为插入到mongodb后返回的结果
   */
  static addShareBook(share, callback) {
    connect.then(function (db) {
      db.collection('share_book').insertOne(share, function (err, result) {
        err && console.error(err);

        callback && callback(result);

        db.close();
      });
    });
  }

  /**
   * 根据页码返回对应的分页数据
   * @param page 页码 [默认为 10]
   * @param limit 一次返回的数据的个数 [默认为 10]
   * @param callback 回调函数
   */
  static getSharedBooksWithAll({page = 1, limit = 10} = {}, callback) {
    // 获得需要跳过的 documents 的个数
    let skip = page > 0 ? (page - 1) * limit : 0;
    connect.then(function (db) {
      db.collection('share_book').find({}).skip(skip).limit(limit).toArray(function (err, documents) {
        err && console.error(err);
        callback && callback(documents);
      });
    });
  }


  static getSharedBookById(id, callback) {
    connect.then(function (db) {
      db.collection('share_book').find({bookId: id}).limit(1).next(function (err, book) {
        err && console.log(err);
        callback && callback(book);
      });
    });
  }

}

export default Book;