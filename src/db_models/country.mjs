import mongoose from 'mongoose';
const { Schema } = mongoose;
import { createModel as createCityModel } from "./city.mjs";
const City = createCityModel();

const countrySchema = new Schema({
  name: String,
  region_id: 
    {
      type: Schema.Types.ObjectId,
      ref: "regions"
    }
},
{
  toJSON: { virtuals: true }
});

countrySchema.virtual("regionInfo", {
  ref: "regions",
  localField: "region_id",
  foreignField: "_id",
  justOne: true
});

countrySchema.post("findOneAndDelete", async (doc) => {
  if (doc) {  //FUNCIONA OK
    await City.deleteMany({
      country_id: {
        $in: doc._id
      }
    })
  }
});

export function createModel() {
  return mongoose.model('countries', countrySchema);
}