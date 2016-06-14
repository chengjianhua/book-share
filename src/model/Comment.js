/**
 * Created by cjh95414 on 2016/6/14.
 */

import connect from  '../database/db';

class Comment {

  /**
   * @description 根据分享的 id 获取到对应的
   * @param shareId 评论关联的分享 id
   * @param callback 获取到评论数据后需要调用的回调函数
     */
  static findCommentsByShareId(shareId, callback) {
    connect.then(function (db) {
      db.collection('share').find({shareId: shareId}).toArray(function (err, documents) {
        err && console.error(err);
        callback && callback(documents);
      });
    });
  }

  static addCommentToShare(shareId, commentObject, callback) {
    connect.then(function (db) {
      db.collection('share')
    })
  }
}

export default Comment;
