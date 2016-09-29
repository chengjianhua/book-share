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
        if (!!user) {
          logger.info(`Found ${username}'s information.'`);
          return callback(null, user);
        }
        logger.warn(`Not found ${username}'s information.'`);
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

  static updateUser(user) {
    const {username} = user;
    return connect.then(db => new Promise((resolve, reject) => {
      db.collection('user').updateOne(
        {
          username,
        },
        {
          $set: user,
        },
        (err, result) => {
          if (err) {
            logger.error(`Update ${username}'s profile failed.'`, err);
            reject(new Error(`Update ${username}'s profile failed.'`));
          } else if (result.matchedCount === 0) {
            logger.warn(`There is not a matched user named "${username}".`);
            reject(new Error(`There is not a matched user named "${username}".`));
          } else {
            logger.info(`Update ${username}'s profile successfully.'`);
            resolve(result);
          }
        });
    }));
  }
}

export default User;
