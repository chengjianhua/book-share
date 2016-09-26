import mongoose, {Schema} from 'mongoose';

export default mongoose.model('User', new Schema({
  name: String,
  password: String,
  admin: Boolean,
}));
