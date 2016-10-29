/**
 * Created by cjh95414 on 2016/6/7.
 */
import connect from '../database/db';
import log4js from 'log4js';

const logger = log4js.getLogger('Model[User]');

const db = connect.then((database) => database.collection('user'));

class User {

  /**
   * @description 根据用户名获得信息
   * @param username 用户名
   * @param callback 所需的回调函数
   */
  static async findUniqueUserByUsername(username, callback) {
    (await db).find({username}).limit(1).next((err, user) => {
      if (!!user) {
        logger.info(`Found ${username}'s information.'`);
        return callback(null, user);
      }
      logger.warn(`Not found ${username}'s information.'`);
      return callback(null);
    });
  }

  /**
   * @description 添加新用户信息到数据库中
   * @param user 要插入到数据库中的用户信息
   * @param callback(result) 插入成功后要执行的操作
   */
  static async addUser(user, callback) {
    (await db).insertOne(user, (err, result) => {
      if (err) {
        logger.error(`Add user ${user.username} failed.`, err);
      }

      // 执行数据库操作完成以后所需的操作
      callback(result);

      db.close();
    });
  }

  static async updateUser(user) {
    const {username} = user;
    const result = await (await db).updateOne(
      {
        username,
      },
      {
        $set: {
          username,
          signature: user.signature,
          gender: user.gender,
        },
      }
    ).then(({userProfile, matchedCount}) => {
      if (matchedCount === 0) {
        logger.warn(`There is not a matched user named "${username}".`);
        Promise.reject(new Error(`There is not a matched user named "${username}".`));
      } else {
        logger.info(`Update ${username}'s profile successfully.'`);
        Promise.resolve(userProfile);
      }
    }).catch((err) => {
      logger.error(`Update ${username}'s profile failed.'`, err);
      Promise.reject(new Error(`Update ${username}'s profile failed.'`));
    });

    return result;
  }

}

export default User;
