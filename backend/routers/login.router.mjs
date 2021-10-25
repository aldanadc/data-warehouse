import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.mjs";
import { authenticateUser } from "../middlewares/auth.middleware.mjs";
import catchAsync from "../utils/catchAsync.mjs";


export function getRouter() {
  const router = new Router();
  router.get("/", goToLogin);
  router.get("/home", verifyToken, renderHomePage);
  router.get("/login", renderLoginForm);
  router.post("/login", catchAsync(authenticateUser), userIsLoggedIn);
  router.get("/logout", logout);

  return router;
}


const renderLoginForm = (request, response) => {
  response.locals.currentUser = null;
  request.currentUser = request.cookies.jwt;
  if (request.currentUser) {
    response.redirect("/home")
  } else {
    response.render("users/login");
  }
}

const userIsLoggedIn = (request, response) => {
  response
    .status(200)
    .redirect("/home")
}

function renderHomePage(request, response) {
  if (request.currentProfile) {
    response.render("home")
  } else {
    response.redirect("/login")
  }
}

function goToLogin(request, response) {
  response.redirect("/login")
}

const logout = (request, response) => {
  response.clearCookie("jwt");
  response.redirect("/login");
}
