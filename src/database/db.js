/**
 * Created by cjh95414 on 2016/6/5.
 */

import {MongoClient, ObjectId, Logger} from 'mongodb';



const url = "mongodb://localhost:27017/book_share";

Logger.setLevel('debug');
Logger.filter('class', ['Db']);

var connect = MongoClient.connect(url);
export default connect;


