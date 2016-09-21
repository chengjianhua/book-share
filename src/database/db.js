/**
 * Created by cjh95414 on 2016/6/5.
 */
import {MongoClient, Logger} from 'mongodb';
import {mongodbUrl} from '../config';

Logger.setLevel('debug');
Logger.filter('class', ['Db']);

const connect = MongoClient.connect(mongodbUrl);
export default connect;
