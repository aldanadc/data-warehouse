import { Router } from "express";
import { createCountry, updateCountry, deleteCountry } from "../config/db.mjs";
import { createCity, updateCity, deleteCity } from "../config/db.mjs";
import { createRegion, deleteRegion, updateRegion } from "../config/db.mjs";
import { getRegions, getCountries, getCities } from "../config/db.mjs";
import { verifyToken } from "../middlewares/auth.middleware.mjs";
import catchAsync from "../utils/catchAsync.mjs";
import ExpressError from "../utils/ExpressError.mjs";
import mongoose from "mongoose";
const ObjectID = mongoose.Types.ObjectId;

export function getRouter() {
  const router = new Router();

  router.get("/regions", verifyToken, catchAsync(renderRegions));
  router.get("/regions/regions/new", verifyToken, renderNewRegionForm);
  router.get("/regions/:id/cities/new", verifyToken, catchAsync(renderNewCityForm));
  router.get("/regions/:id/countries/new", verifyToken, catchAsync(renderNewCountryForm));

  router.post("/regions/regions", verifyToken, catchAsync(createNewRegion));
  router.post("/regions/cities", verifyToken, catchAsync(createNewCity));
  router.post("/regions/countries", verifyToken, catchAsync(createNewCountry));

  router.get("/regions/regions/:id/edit", verifyToken, catchAsync(renderEditRegionForm));
  router.get("/regions/cities/:id/edit", verifyToken, catchAsync(renderEditCityForm));
  router.get("/regions/countries/:id/edit", verifyToken, catchAsync(renderEditCountryForm));

  router.put("/regions/regions/:id", verifyToken, catchAsync(updateARegion));
  router.put("/regions/cities/:id", verifyToken, catchAsync(updateACity));
  router.put("/regions/countries/:id", verifyToken, catchAsync(updateACountry));

  router.delete("/regions/regions/:id", verifyToken, catchAsync(deleteARegion));
  router.delete("/regions/cities/:id", verifyToken, catchAsync(deleteACity));
  router.delete("/regions/countries/:id", verifyToken, catchAsync(deleteACountry));

  return router;
}

const renderRegions = async (request, response) => {
  const regions = await getRegions();
  const countries = await getCountries();
  const cities = await getCities();
  response.render("regions/regionsTree", { regions, countries, cities });
}

const createNewRegion = async (request, response) => {
  if (!request.body.newRegion) throw new ExpressError(400, "Información inválida");
  await createRegion(request.body.newRegion);
  response.redirect("/regions");
}

const deleteARegion = async (request, response, next) => {
  const { id } = request.params;
  if (!ObjectID.isValid(id)) {
    return next(new ExpressError(400, "ID de región inválido"));
  }
  const regionToDelete = await deleteRegion(id);
  if (regionToDelete === null) throw new ExpressError(404, "Región inexistente");
  response.redirect("/regions");
}

const updateARegion = async (request, response, next) => {
  const { id } = request.params;
  if (!ObjectID.isValid(id)) {
    return next(new ExpressError(400, "ID de región inválido"));
  }
  if (!request.body.editRegion) throw new ExpressError(400, "Información inválida");
  const regionInfo = {...request.body.editRegion}
  await updateRegion(id, regionInfo);
  response.redirect("/regions")
}

const renderEditRegionForm = async (request, response, next) => {
  const { id } = request.params;
  if (!ObjectID.isValid(id)) {
    return next(new ExpressError(400, "ID de región inválido"));
  }
  const region = await getRegions({_id: id});
  if (region === null || region.length === 0) throw new ExpressError(404, "Región inexistente");
  response.render("regions/newEditRegion", { region });
}


const renderNewRegionForm = (request, response) => {
  const region = undefined;
  response.render("regions/newEditRegion", { region });
}

const renderNewCityForm = async (request, response, next) => {
  const { id } = request.params;
  if (!ObjectID.isValid(id)) {
    return next(new ExpressError(400, "ID de país inválido"));
  }
  const country = await getCountries({_id: id});
  if (country === null || country.length === 0) throw new ExpressError(404, "País inexistente");
  const city = undefined;
  response.render("regions/newEditCity", { country, city });
}

const createNewCity = async (request, response) => {
  if (!request.body.newCity) throw new ExpressError(400, "Información inválida");
  await createCity(request.body.newCity);
  response.redirect("/regions");
}

const renderEditCityForm = async (request, response, next) => {
  const { id } = request.params;
  if (!ObjectID.isValid(id)) {
    return next(new ExpressError(400, "ID de ciudad inválido"));
  }
  const city = await getCities({_id: id});
  if (city === null || city.length === 0) throw new ExpressError(404, "Ciudad inexistente");
  response.render("regions/newEditCity", { city });
}

const updateACity = async (request, response, next) => {
  const { id } = request.params;
  if (!ObjectID.isValid(id)) {
    return next(new ExpressError(400, "ID de ciudad inválido"));
  }
  if (!request.body.editCity) throw new ExpressError(400, "Información inválida");
  const cityInfo = {...request.body.editCity}; 
  await updateCity(id, cityInfo);
  response.redirect("/regions");
}

const deleteACity = async (request, response) => {
  const { id } = request.params;
  if (!ObjectID.isValid(id)) {
    return next(new ExpressError(400, "ID de ciudad inválido"));
  }
  const cityToDelete = await deleteCity(id);
  if (cityToDelete === null || cityToDelete.length === 0) throw new ExpressError(404, "País inexistente");
  response.redirect("/regions");
}

const renderNewCountryForm = async (request, response, next) => {
  const { id } = request.params;
  if (!ObjectID.isValid(id)) {
    return next(new ExpressError(400, "ID de región inválido"));
  }
  const region = await getRegions({_id: id});
  if (region === null || region.length === 0) throw new ExpressError(404, "Región inexistente");
  const country = undefined;
  response.render("regions/newEditCountry", { region, country });
}


const createNewCountry = async (request, response) => {
  if (!request.body.newCountry) throw new ExpressError(400, "Información inválida");
  await createCountry(request.body.newCountry);
  response.redirect("/regions");
}

const renderEditCountryForm = async (request, response, next) => {
  const { id } = request.params;
  if (!ObjectID.isValid(id)) {
    return next(new ExpressError(400, "ID de país inválido"));
  }
  const country = await getCountries({_id: id});
  if (country === null || country.length === 0) throw new ExpressError(404, "País inexistente");
  response.render("regions/newEditCountry", { country });
}

const updateACountry = async (request, response, next) => {
  const { id } = request.params;
  if (!ObjectID.isValid(id)) {
    return next(new ExpressError(400, "ID de país inválido"));
  }
  if (!request.body.editCountry) throw new ExpressError(400, "Información inválida");
  const countryInfo = {...request.body.editCountry};
  await updateCountry(id, countryInfo);
  response.redirect("/regions")
}

const deleteACountry = async (request, response, next) => {
  const { id } = request.params;
  if (!ObjectID.isValid(id)) {
    return next(new ExpressError(400, "ID de país inválido"));
  }
  const countryToDelete = await deleteCountry(id);
  if (countryToDelete === null || countryToDelete.length === 0) throw new ExpressError(404, "País inexistente");
  response.redirect("/regions");
}
