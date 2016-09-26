/**
 * Created by cjh95414 on 2016/6/7.
 */
import connect from '../database/db';
import log4js from 'log4js';

const logger = log4js.getLogger('Model[User]');

class User {

  /**
   * @description 根据用户名获得信息
   * @param username 用户名
   * @param callback 所需的回调函数
   */
  static findUniqueUserByUsername(username, callback) {
    connect.then((db) => {
      db.collection('user').find({username}).limit(1).next((err, user) => {
        logger.info(`Find ${username}'s information.'`);

        if (user) {
          return callback(null, user);
        }

        return callback(null);
      });
    });
  }


  /**
   * @description 添加新用户信息到数据库中
   * @param user 要插入到数据库中的用户信息
   * @param callback(result) 插入成功后要执行的操作
   */
  static addUser(user, callback) {
    connect.then((db) => {
      db.collection('user').insertOne(user, (err, result) => {
        if (err) {
          logger.error(`Add user ${user.username} failed.`, err);
        }

        // 执行数据库操作完成以后所需的操作
        callback(result);

        db.close();
      });
    });
  }

}

export default User;
