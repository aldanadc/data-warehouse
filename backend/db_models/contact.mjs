import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const methodSchema = new Schema({
  channel: {
  type: String,
  enum: ["phone", "email", "whatsapp", "linkedin", "twitter"]
  },
  account: String,
  preference: {
    type: String,
    enum: ["no preference","favourite", "do not disturb"]
  }
});

export const Method = mongoose.model('contact_methods', methodSchema);

const contactSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  interest: {
    type: Number,
    enum: [0, 25, 50, 75, 100],
    required: true
  },
  company_id: {
    type: Schema.Types.ObjectId,
    ref: "companies",
    required: true
  },
  city_id: {
    type: Schema.Types.ObjectId,
    ref: "cities",
    required: true
  },
  address: {
    type: String,
    required: true
  },
  contact_methods: [methodSchema]
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }

});

contactSchema.virtual("companyInfo", {
  ref: "companies",
  localField: "company_id",
  foreignField: "_id",
  justOne: true
});


contactSchema.virtual("cityInfo", {
  ref: "cities",
  localField: "city_id",
  foreignField: "_id",
  justOne: true
});

contactSchema.virtual("preferenceToShow").get(function() {
  return ["Sin preferencia", "Favorito", "No molestar"]
})

export function createModel() {
  return mongoose.model('contacts', contactSchema);
}