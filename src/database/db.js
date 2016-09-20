/**
 * Created by cjh95414 on 2016/6/5.
 */
import {MongoClient, Logger} from 'mongodb';

const url = 'mongodb://123.206.6.150:27017/book_share';

Logger.setLevel('debug');
Logger.filter('class', ['Db']);

const connect = MongoClient.connect(url);
export default connect;
