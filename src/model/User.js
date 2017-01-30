/**
 * Created by cjh95414 on 2016/6/7.
 */
import { ObjectId } from 'mongodb';
import log4js from 'log4js';
import connect from '../database/db';
import { handleDbOpResult as handlers } from './utils';

const logger = log4js.getLogger('Model[User]');

const db = connect.then((database) => database.collection('user'));

class User {

  /**
   * @description 根据用户名获得信息
   * @param username 用户名
   * @param callback 所需的回调函数
   */
  static async findUniqueUserByUsername(username, callback) {
    (await db).find({ username }).limit(1).next((err, user) => {
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
  static async addUser(user) {
    const result = await (await db).insertOne(user)
      .then(({ insertedCount, insertedId }) => {
        if (insertedCount) {
          logger.info(`Add user ${JSON.stringify(user)} into database successfully.`);
          Promise.resolve(insertedId);
        } else {
          logger.error(`Add user ${JSON.stringify(user)} failed.`);
          Promise.reject(new Error(`Add user ${user.username} failed.`));
        }
      });

    return result;
  }

  static async updateUser(user) {
    const { username, signature, gender } = user;

    const result = await (await db).updateOne(
      {
        username,
      },
      {
        $set: {
          username,
          signature,
          gender,
        },
      }
    ).then(({ userProfile, matchedCount }) => {
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

  static async star(username, shareId) {
    const result = await (await db).updateOne(
      {
        username,
      },
      {
        $addToSet: {
          'stars.books': new ObjectId(shareId),
        },
      }
    );

    try {
      await handlers.updateWriteOpResult(result);
      logger.info(`User "${username}" star share: "${shareId}" successfully.`);
      return true;
    } catch (e) {
      logger.error(e.message);
    }

    logger.info(`User "${username}" star share: "${shareId}" failed.`);
    return false;
  }

  static async unstar(username, shareId) {
    const result = await (await db).updateOne(
      {
        username,
      },
      {
        $pull: {
          'stars.books': new ObjectId(shareId),
        },
      },
    );

    try {
      await handlers.updateWriteOpResult(result);
      logger.info(`User "${username}" unstar share: "${shareId}" successfully.`);
      return true;
    } catch (e) {
      logger.error(e.message);
    }

    logger.info(`User "${username}" unstar share: "${shareId}" failed.`);
    return false;
  }

}

export default User;
