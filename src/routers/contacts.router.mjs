import { Router } from "express";
import { getRegions } from "../config/db.mjs";
import { editContact } from "../config/db.mjs";
import { getCompanies } from "../config/db.mjs";
import { getCountries } from "../config/db.mjs";
import { deleteManyContacts } from "../config/db.mjs";
import { deleteContact } from "../config/db.mjs";
import { getContacts, getCities } from "../config/db.mjs";
import { createContact } from "../config/db.mjs";
import { Method } from "../db_models/contact.mjs";
import { verifyToken } from "../middlewares/auth.middleware.mjs";
import catchAsync from "../utils/catchAsync.mjs";
import ExpressError from "../utils/ExpressError.mjs";
import mongoose from "mongoose";
import { validateNewContact, validateEditContact } from "../utils/joiSchemas.mjs";
const ObjectID = mongoose.Types.ObjectId;


export function getRouter() {
  const router = new Router();

  router.get("/contacts", verifyToken, catchAsync(showAllContacts));
  router.get("/contacts/search/:term", verifyToken, catchAsync(searchContacts));
  router.get("/contacts/new", verifyToken, catchAsync(renderNewContactForm));
  router.post("/contacts", verifyToken, catchAsync(createNewContact));
  router.get("/contacts/:id", verifyToken, catchAsync(showOneContact));
  router.get("/contacts/:id/edit", verifyToken, catchAsync(renderEditContactForm));
  router.put("/contacts/:id/edit", verifyToken, catchAsync(editAContact));
  router.delete("/contacts/deleteMany", verifyToken, deleteContacts);
  router.delete("/contacts/:id", verifyToken, catchAsync(deleteAContact));

  
  return router;
}

const filterContacts = (array, property, searchTerm) => {
  return array.reduce(function (total, contact) {
    let key = contact[property];
    if (key === searchTerm) console.log(key)
    if (!total[key]) {
      total[key] = [];
    }
    total[key].push(contact);
    return total
  }, {});
}

const searchContacts = async (request, response) => {
  let { term } = request.params;
  term = term.toLowerCase();
  // term = removeAccentMarks(term);
  // let contactsByCity;
  // let contactsByCountry;

  const results = await getContacts({$or: [{first_name: {$regex: term, $options: "i"}}, {last_name: {$regex: term, $options: "i"}}, 
    {role: {$regex: term, $options: "i"}}, {email: {$regex: term, $options: "i"}}, {address: {$regex: term, $options: "i"}}]});
  const allContacts = await getContacts();

  //const lala = filterContacts(allContacts, "cityInfo.name", term)
  allContacts.forEach(contact => {
    if (contact.companyInfo.name.toLowerCase().includes(term)) {
      results.push(contact);
    }
    if (contact.cityInfo.name.toLowerCase().includes(term)) {
      results.push(contact);
    }
    if (contact.cityInfo.countryInfo.name.toLowerCase().includes(term)) {
      results.push(contact);
    }

    contact.contact_methods.forEach(method => {
      if (method.channel.toLowerCase() === term) {
        results.push(contact);
      }
    })
  })

  response.send(results);
}

const showAllContacts = async (request, response) => {
  const contacts = await getContacts();
  response.render("contacts/allContacts", { contacts });
}

const showOneContact = async (request, response, next) => {
  const id = request.params.id;
  if (!ObjectID.isValid(id)) {
    return next(new ExpressError(400, "ID de contacto inválido"));
  }
  const contact = await getContacts({_id: id});
  if (contact === null || contact.length === 0) throw new ExpressError(404, "Contacto inexistente");
  response.render("contacts/oneContact", { contact });
}

const createNewContact = async (request, response) => {
  if (!request.body.contact_methods) throw new ExpressError(400, "Información inválida");
  const methods = request.body.contact_methods;
  console.log(methods)
  const methodsArray = [];
  for (let i=0; i<methods.length; i++) {
    const method = new Method(methods[i]);
    methodsArray.push(method);
  }
  if (!request.body.newContact) throw new ExpressError(400, "Información inválida");
  await createContact(request.body.newContact, methodsArray);
  response.redirect("/contacts");
}

const renderNewContactForm = async (request, response) => {
  const regions = await getRegions();
  const countries = await getCountries();
  const cities = await getCities();
  const companies = await getCompanies();
  const contact = undefined;
  response.render("contacts/newEditContact", { contact, regions, countries, cities, companies });
}

const renderEditContactForm = async (request, response, next) => {
  const { id } = request.params;
  if (!ObjectID.isValid(id)) {
    return next(new ExpressError(400, "ID de contacto inválido"));
  }
  const contact = await getContacts({_id: id});
  if (contact === null || contact.length === 0) throw new ExpressError(404, "Contacto inexistente");
  const regions = await getRegions();
  const countries = await getCountries();
  const cities = await getCities();
  const companies = await getCompanies();
  console.log(contact[0].contact_methods)
  response.render("contacts/newEditContact", { contact, regions, countries, cities, companies });
}

const editAContact = async (request, response, next) => {
  const { id } = request.params;
  if (!ObjectID.isValid(id)) {
    return next(new ExpressError(400, "ID de contacto inválido"));
  }
  if (!request.body.editContact) throw new ExpressError(400, "Información inválida");
  const contactInfo = {...request.body.editContact};
  if (!request.body.contact_methods) throw new ExpressError(400, "Información inválida");
  const methods = request.body.contact_methods;
  const methodsArray = [];
  if (methods) {
    for (let i=0; i<methods.length; i++) {
      const method = new Method(methods[i]);
      methodsArray.push(method);
    }
  }
  contactInfo.contact_methods = methodsArray;
  await editContact(id, contactInfo);
  response.redirect("/contacts");
}

const deleteAContact = async (request, response, next) => {
  const { id } = request.params;
  if (!ObjectID.isValid(id)) {
    return next(new ExpressError(400, "ID de contacto inválido"));
  }
  const contactToDelete = await deleteContact(id);
  if (contactToDelete === null) throw new ExpressError(404, "Contacto inexistente")
  response.redirect("/contacts");
}


const deleteContacts = async (request, response) => {
  if (!request.body.deleteContact) throw new ExpressError(400, "Información inválida");
  const idsToDelete = request.body.deleteContact;
  console.log(idsToDelete)
  await deleteManyContacts(idsToDelete);
  response.redirect("/contacts");
}


  // if (contacts.length === 0) {
  //   const city = await getCities({name: term});
  //   const cityId = city[0]._id;
  //   contactsByCity = await getContacts({city_id: cityId});
      
  //   if (contactsByCity.length > 0) {
  //     response.send(contactsByCity);
  //     return
  //   }
  // }
  
  //   }else {
  //     const country = await getCountries({name: term});
  //     const countryId = country[0]._id;
  //     contactsByCountry = await getContacts({country_id: countryId});
  //     response.send(contactsByCountry);
  //     return
  //   }
  // }else {
  //   response.send(contacts);
  //   return contacts
  //}

  function removeAccentMarks(string){
    const letters = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
    const cleanString = string.split('').map(letter => letters[letter] || letter).join('').toString();
    return cleanString
  }