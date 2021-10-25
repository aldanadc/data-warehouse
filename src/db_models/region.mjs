import mongoose from 'mongoose';
const { Schema } = mongoose;

const regionSchema = new Schema({
  name: String,
})

// regionSchema.post("findOneAndDelete", async (doc) => {
//   if (doc) {
//     await Country.deleteMany({
//       region_id: {
//         $in: doc._id
//       }
//     })
//   }
// });

export function createModel() {
  return mongoose.model('regions', regionSchema);
}