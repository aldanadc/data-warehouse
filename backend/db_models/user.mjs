import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profile: {
    type: String,
    enum: ["admin", "basic"],
    lowercase: true,
    required: true
  }
})

export function createModel() {
  return mongoose.model('users', userSchema);
}