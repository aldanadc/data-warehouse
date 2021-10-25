import mongoose from 'mongoose';
const { Schema } = mongoose;

const regionSchema = new Schema({
  name: String,
})

export function createModel() {
  return mongoose.model('regions', regionSchema);
}