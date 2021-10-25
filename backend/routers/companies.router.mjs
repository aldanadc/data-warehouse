import { Router } from "express";
import { updateCompany } from "../config/db.mjs";
import { getCities } from "../config/db.mjs";
import { deleteCompany } from "../config/db.mjs";
import { getCompanies } from "../config/db.mjs";
import { createCompany } from "../config/db.mjs";
import { verifyToken } from "../middlewares/auth.middleware.mjs";
import catchAsync from "../utils/catchAsync.mjs";
import ExpressError from "../utils/ExpressError.mjs";
import mongoose from "mongoose";
const ObjectID = mongoose.Types.ObjectId;

export function getRouter() {
  const router = new Router();

  router.get("/companies", verifyToken, catchAsync(getAllCompanies));
  router.get("/companies/new", verifyToken, catchAsync(renderNewCompanyForm));
  router.get("/companies/:id", verifyToken, catchAsync(getOneCompany));
  router.get("/companies/:id/edit", verifyToken, catchAsync(renderEditCompanyForm));
  router.post("/companies", verifyToken, catchAsync(createNewCompany));
  router.put("/companies/:id", verifyToken, catchAsync(updateACompany));
  router.delete("/companies/:id", verifyToken, catchAsync(deleteACompany));

  return router;
}

const getAllCompanies = async (request, response) => {
  const companies = await getCompanies();
  response.render("companies/allCompanies", { companies });
}

const getOneCompany = async (request, response, next) => {
  const id = request.params.id;
  if (!ObjectID.isValid(id)) {
    return next(new ExpressError(400, "ID de compañía inválido"));
  }
  const company = await getCompanies({_id: id});
  if (company === null || company.length === 0) throw new ExpressError(404, "Compañía inexistente")
  response.send(company);
}

const createNewCompany = async (request, response) => {
  if (!request.body.newCompany) throw new ExpressError(400, "Información inválida");
  await createCompany(request.body.newCompany);
  response.redirect("/companies");
}

const renderNewCompanyForm = async (request, response) => {
  const cities = await getCities();
  const company = undefined;
  response.render("companies/newEditCompany", { cities, company })
}

const renderEditCompanyForm = async (request, response, next) => {
  const { id } = request.params;
  if (!ObjectID.isValid(id)) {
    return next(new ExpressError(400, "ID de compañía inválido"));
  }
  const cities = await getCities();
  const company = await getCompanies({_id: id});
  if (company === null || company.length === 0) throw new ExpressError(404, "Compañía inexistente")
  response.render("companies/newEditCompany", { cities, company })
}

const updateACompany = async (request, response, next) => {
  const { id } = request.params;
  if (!ObjectID.isValid(id)) {
    return next(new ExpressError(400, "ID de compañía inválido"));
  }
  if (!request.body.editCompany) throw new ExpressError(400, "Información inválida");
  const companyInfo = {...request.body.editCompany};
  await updateCompany(id, companyInfo); 
  response.redirect("/companies");
}

const deleteACompany = async (request, response, next) => {
  const id = request.params.id;
  if (!ObjectID.isValid(id)) {
    return next(new ExpressError(400, "ID de compañía inválido"));
  }
  const deletedCompany = await deleteCompany(id);
  if (deletedCompany === null) throw new ExpressError(404, "Compañía inexistente")
  response.redirect("/companies");
}