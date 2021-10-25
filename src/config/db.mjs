import mongoose from "mongoose";
import { ENV } from "./env.mjs";
import { createModel as createUserModel } from "../db_models/user.mjs";
import { createModel as createRegionModel } from "../db_models/region.mjs";
import { createModel as createCityModel } from "../db_models/city.mjs";
import { createModel as createCountryModel } from "../db_models/country.mjs";
import { createModel as createCompanyModel } from "../db_models/company.mjs";
import { createModel as createContactModel } from "../db_models/contact.mjs";
import { Method } from "../db_models/contact.mjs";
const User = createUserModel();
const Region = createRegionModel();
const City = createCityModel();
const Country = createCountryModel();
const Company = createCompanyModel();
const Contact = createContactModel();

const URL = `${ENV.DB_SCHEMA}://${ENV.DB_USERNAME}:${ENV.DB_PASSWORD}@${ENV.DB_AUTHORITY}/${ENV.DB_NAME}`;
//const URL = "mongodb+srv://admin:bananaPancake@cluster0.8mxmo.mongodb.net/lalala";
const DB_MODELS = {};

export default async function connectDB() {

  await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

  .then(() => {
    console.log("Connection to database open");
    //DB_MODELS.User = createUserModel();
  })
  .catch(err => {
    console.log("There was an error");
    console.log(err);
  });

  mongoose.connection.on('error', (error) => {
    console.error('connection error:', error);
  });
}

//USERS

export async function createUser(userInfo) {
    /** @type {mongoose.Model} */
  const newUser = await new User(userInfo);
  await newUser.save();
}

//GET ALL USERS

export async function getUsers(filter = {}) {
  const users = await User.find(filter);
  return users
}

export async function editUser(id, newInfo) {
  const user = await User.findByIdAndUpdate(id, newInfo, {new: true});
  return user
}

export async function deleteUser(id) {
  const deletedUser = await User.findByIdAndDelete(id);
  console.log(deletedUser)
  return deletedUser
}

//LOGIN

export async function validateUserAgainstDB(logInInfo) {
  const user = await User.findOne({
    email: logInInfo.email,
    password: logInInfo.password
  }).exec();
  if (user) {
    return user;
  } else {
    return false;
  }
}

//REGIONS

export async function getRegions(filter = {}) {
  const regions = await Region.find(filter);
  return regions
}

export async function createRegion(regionName) {
  const region = await new Region({name: regionName});
  await region.save();
}

export async function deleteRegion(id) {
  await Region.findOneAndDelete({_id: id});
  const countries = await Country.find({region_id: id});
  for (let country of countries) {
    await Country.findOneAndDelete({_id: country._id});
    const cities = await City.find({country_id: country._id});
    for (let city of cities) {
      await City.findOneAndDelete({_id: city._id })
    }
  }
}


export async function updateRegion(id, regionInfo) {
  const region = await Region.findByIdAndUpdate(id, regionInfo);
  await region.save();
}


//CITIES

export async function getCities(filter = {}) {
  const cities = await City.find(filter).populate("countryInfo").exec();
  return cities
}

export async function createCity(cityInfo) {
  const city = await new City(cityInfo);
  await city.save();
}

export async function deleteCity(id) {
  await City.findByIdAndDelete(id);
}

export async function updateCity(id, cityInfo) {
  const city = await City.findByIdAndUpdate(id, cityInfo);
  await city.save();
}

//COUNTRIES

export async function getCountries(filter = {}) {
  const countries = await Country.find(filter).populate("regionInfo").exec();
  return countries
}

export async function createCountry(countryInfo) {
  const country = await new Country(countryInfo);
  await country.save();
}

export async function deleteCountry(id) {
  await Country.findOneAndDelete({_id: id});
}

export async function updateCountry(id, countryInfo) {
  const country = await Country.findByIdAndUpdate(id, countryInfo);
  await country.save();
}

//COMPANIES

export async function getCompanies(filter = {}) {
  const companies = await Company.find(filter).populate({
    path: "cityInfo",
    populate: {
      path: "countryInfo",
      populate: {
        path: "regionInfo"
      }
    }
  }).exec();
  return companies
}

export async function createCompany(companyInfo) {
  const company = await new Company(companyInfo);
  await company.save();
}

export async function deleteCompany(id) {
  //await Company.findByIdAndDelete(id);
  await Company.findOneAndDelete({_id: id});
}

export async function updateCompany(id, companyInfo) {
  const company = await Company.findByIdAndUpdate(id, companyInfo);
  await company.save();
}


//CONTACTS

// export async function createContactMethod(methodInfo) { //CREO QUE ESTABA SIN USAR
//   const contactMethod = await new Method(methodInfo);
//   //contactMethod.contact = contactId;
//   await contactMethod.save();
// }

export async function createContact(contactInfo, methodInfo) {
  /** @type {mongoose.Model} */
  contactInfo.contact_methods = methodInfo;
  const newContact = new Contact(contactInfo);
  await newContact.save();
}

export async function getContacts(filter = {}) {
const contacts = await Contact.find(filter).populate("companyInfo").populate({
  path: "cityInfo",
  populate: {
    path: "countryInfo",
    populate: {
      path: "regionInfo"
    }
  }
  }).exec();
  return contacts 
}

export async function editContact(id, newInfo) {
  const contact = await Contact.findByIdAndUpdate(id, newInfo, {new: true});
  return contact
}

export async function deleteContact(id) {
  const deletedContact = await Contact.findByIdAndDelete(id);
  return deletedContact
}

export async function deleteManyContacts(idsArray) {
  console.log(idsArray);
  const deletedContacts = await Contact.deleteMany({_id: { $in: idsArray }});
  return deletedContacts
}


export async function getContactMethods(filter = {}) {
  const methods = await Method.find(filter).populate("contacts").exec();
  return methods 
}

