import Joi from "joi";
import ExpressError from "./ExpressError.mjs";

//USERS

export const validateNewUser = (request, response, next) => {
  const userSchema = Joi.object({
    newUser: Joi.object({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().email({ minDomainSegments: 2 }).required(),
      profile: Joi.string().required(),
      password: Joi.string().required(),
      password_repeat: Joi.ref("password"),
    }).required()
  })
  const { error } = userSchema.validate(request.body);
  if (error) {
    const message = error.details.map(element => element.message).join(",")
    throw new ExpressError(400, message)
  }else {
    next();
  }
}

export const validateEditUser = (request, response, next) => {
  const userSchema = Joi.object({
    editUser: Joi.object({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().email({ minDomainSegments: 2 }).required(),
      profile: Joi.string().required(),
      password: Joi.string().required(),
      password_repeat: Joi.ref("password"),
    }).required()
  })
  const { error } = userSchema.validate(request.body);
  if (error) {
    const message = error.details.map(element => element.message).join(",")
    throw new ExpressError(400, message);
  }else {
    next();
  }
}


export const validateNewContact = (request, response, next) => {
  const contactSchema = Joi.object({
    newContact: Joi.object({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      role: Joi.string().required(),
      email: Joi.string().email({ minDomainSegments: 2 }).required(),
      interest: Joi.number().integer().min(0).max(100).required(),
      company_id: Joi.string().required(),
      city_id: Joi.string().required(),
      country_id: Joi.string().required(),
      region_id: Joi.string().required(),
      address: Joi.string().required()
    }).required()
  })
  const contactMethodsSchema = Joi.object({
    contact_methods: Joi.array().items(Joi.object({
      channel: Joi.string().required(),
      account: Joi.string().required(),
      preference: Joi.string().required()
    }).required())
  })
  const { error } = contactSchema.validate(request.body);
  const { error2} = contactMethodsSchema.validate(request.body);
  
  if (error) {
    const message = error.details.map(element => element.message).join(",")
    throw new ExpressError(400, message)
  }else {
    next();
  }
}

export const validateEditContact = (request, response, next) => {
  const contactSchema = Joi.object({
    editContact: Joi.object({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      role: Joi.string().required(),
      email: Joi.string().email({ minDomainSegments: 2 }).required(),
      interest: Joi.number().integer().min(0).max(100).required(),
      company_id: Joi.string().required(),
      city_id: Joi.string().required(),
      country_id: Joi.string().required(),
      region_id: Joi.string().required(),
      address: Joi.string().required(),
      contact_methods: Joi.array().required(),
    }).required()
  })
  const { error } = contactSchema.validate(request.body);
  if (error) {
    const message = error.details.map(element => element.message).join(",")
    throw new ExpressError(400, message)
  }else {
    next();
  }
}