import mongoose from 'mongoose';
const { Schema } = mongoose;

const citySchema = new Schema({
  name: String,
  country_id:
    {
      type: Schema.Types.ObjectId,
      ref: "countries"
    }
},
{
  toJSON: { virtuals: true }
});

citySchema.virtual("countryInfo", {
  ref: "countries",
  localField: "country_id",
  foreignField: "_id",
  justOne: true
});

export function createModel() {
  return mongoose.model('cities', citySchema);
}