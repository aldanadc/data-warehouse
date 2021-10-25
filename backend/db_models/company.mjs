import mongoose from 'mongoose';
const { Schema } = mongoose;
import { createModel as createContactModel } from "./contact.mjs";
const Contact = createContactModel();

const companySchema = new Schema({
  name: String,
  address: String,
  email: String,
  phone_number: String,
  city_id: 
    {
      type: Schema.Types.ObjectId,
      ref: "cities"
    }
}, {
  toJSON: { virtuals: true }, 
  toObject: { virtuals: true }
});


companySchema.virtual("cityInfo", {
  ref: "cities",
  localField: "city_id",
  foreignField: "_id",
  justOne: true
});

companySchema.post("findOneAndDelete", async (doc) => {
  if (doc) {
    console.log(doc)
    await Contact.deleteMany({
      company_id: {
        $in: doc._id
      }
    })
  }
});

export function createModel() {
  return mongoose.model('companies', companySchema);
}