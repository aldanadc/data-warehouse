//import Region from "../db_models/region";
import { ENV } from "./config/env.mjs";
import { locations, users, companies, contacts } from "./seeds/DBseeds.mjs";
import mongoose from "mongoose";
import { createModel as createRegionModel } from "./db_models/region.mjs";
import { createModel as createCountryModel } from "./db_models/country.mjs";
import { createModel as createCityModel } from "./db_models/city.mjs";
import { createModel as createUserModel } from "./db_models/user.mjs";
import { createModel as createCompanyModel } from "./db_models/company.mjs";
import { createModel as createContactModel } from "./db_models/contact.mjs";
const Region = createRegionModel();
const Country = createCountryModel();
const City = createCityModel();
const User = createUserModel();
const Company = createCompanyModel();
const Contact = createContactModel();


const URL = `${ENV.DB_SCHEMA}://${ENV.DB_USERNAME}:${ENV.DB_PASSWORD}@${ENV.DB_AUTHORITY}/${ENV.DB_NAME}`;

//const URL = "mongodb+srv://admin:bananaPancake@cluster0.8mxmo.mongodb.net/lalala";

async function connectDB() {

  await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

  .then(() => {
    console.log("Connection to database open");

  })
  .catch(err => {
    console.log("There was an error");
    console.log(err);
  });

  mongoose.connection.on('error', (error) => {
    console.error('connection error:', error);
  });
}

connectDB();

const seedDb = async () => {
  await Region.deleteMany({});
  for (let i=0; i<2; i++) {
    const region = new Region({
      name: locations[i].region
    })
    await region.save();
  }

  await Country.deleteMany({});
  for (let i=0; i<2; i++) {
    const regionLength = locations[i].countries.length;
    for (let j=0; j<regionLength; j++) {
      const region = locations[i].region;
      const foundRegion = await Region.findOne({name: region}).exec();
      const country = new Country({
        name: locations[i].countries[j].country,
        region_id: foundRegion._id
      })
      await country.save();
    }
  }

  await City.deleteMany({});
  for (let i=0; i<2; i++) {
    const regionLength = locations[i].countries.length;
    for (let j=0; j<regionLength; j++) {
      const countryLength = locations[i].countries[j].cities.length;
      for (let k=0; k<countryLength; k++) {
        const country = locations[i].countries[j].country;
        const foundCountry = await Country.findOne({name: country}).exec();
        const city = new City({
          name: locations[i].countries[j].cities[k],
          country_id: foundCountry._id
        })
        await city.save();
      }
    }
  }

  await User.deleteMany({});
  for (let i=0; i<users.length; i++) {
    const user = new User({
      first_name: users[i].first_name,
      last_name: users[i].last_name,
      email: users[i].email,
      password: users[i].password,
      profile: users[i].profile
    })
    await user.save();
  }

  await Company.deleteMany({});
  for (let i=0; i<companies.length; i++) {
    const companyCity = await City.findOne({name: companies[i].city});
    const company = new Company({
      name: companies[i].name,
      address: companies[i].address,
      email: companies[i].email,
      phone_number: companies[i].phone_number,
      city_id: companyCity._id
    })
    await company.save();
  }

  await Contact.deleteMany({});
  for (let i=0; i<contacts.length; i++) {
    const contactCity = await City.findOne({name: contacts[i].city});
    const contactCompany = await Company.findOne({name: contacts[i].company});
    
    const contact = new Contact({
      first_name: contacts[i].first_name,
      last_name: contacts[i].last_name,
      role: contacts[i].role,
      email: contacts[i].email,
      interest: contacts[i].interest,
      company_id: contactCompany._id,
      city_id: contactCity._id,
      address: contacts[i].address,
      contact_methods: contacts[i].contact_methods
    })
    await contact.save();
  }
}

// const seedDbCountries = async () => {
//   await Country.deleteMany({});
//   for (let i=0; i<2; i++) {
//     const regionLength = locations[i].length;
//     for (let i=0; i<regionLength; i++) {
//       console.log(locations[i].countries[i].country)
//       const country = new Country({
//         name: locations[i].countries[i].country,
//         country_id: "60d93213a3705f30e042aa0d"
//       })
//       await country.save();
//     }
//   }
// }




seedDb().then(() => {
  mongoose.connection.close();
})