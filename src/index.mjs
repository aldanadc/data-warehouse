import express, { json, urlencoded } from "express";
import { ENV } from "./config/env.mjs";
import connectDB from "./config/db.mjs";
import { getRouter as getUsersRouter } from "./routers/users.router.mjs";
import { getRouter as getLoginRouter } from "./routers/login.router.mjs";
import { getRouter as getRegionsRouter } from "./routers/regions.router.mjs";
import { getRouter as getCompaniesRouter } from "./routers/companies.router.mjs";
import { getRouter as getContactsRouter } from "./routers/contacts.router.mjs";
import ejsMate from "ejs-mate";
import path from "path";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import ExpressError from "./utils/ExpressError.mjs";
const __dirname = path.resolve();

const basePath = "/1.0.0";

function loadMiddlewares(server) {
  server.use(json());
  server.use(urlencoded({ extended: true }));
  server.use(cookieParser());
  server.use(methodOverride("_method"));

}


function loadRouters(server) {
  const usersRouter = getUsersRouter();
  const loginRouter = getLoginRouter();
  const regionsRouter = getRegionsRouter();
  const companiesRouter = getCompaniesRouter();
  const contactsRouter = getContactsRouter();

  server.use("/", loginRouter);
  server.use("/", usersRouter);
  server.use("/", regionsRouter);
  server.use("/", companiesRouter);
  server.use("/", contactsRouter);

  
}

function config(server) {
  server.engine("ejs", ejsMate);
  server.set("view engine", "ejs");
  server.set("views", path.join(__dirname, "views"));
  server.use(express.static("../public"));
}


async function main() {
  const server = express();
  loadMiddlewares(server);
  loadRouters(server);

  server.use((request, response, next) => {
    response.locals.currentUser = null;
    next();
  });

  config(server);
  

  // server.use((request, response, next) => {
  //   // response.locals.success = request.flash("success");
  //   // response.locals.error = request.flash("error");
  //   response.locals.currentUser = request.user;
  //   next();
  // });

  server.all("*", (request, response, next) => {
    next(new ExpressError(404, "Página no encontrada"))
  })

  server.use((err, request, response, next) => {
    const {statusCode = 500 } = err;
    if (!err.message) { 
      err.message = "Lo sentimos, algo salió mal";
    }
    response.status(statusCode).render("partials/error", { err });
  })

  await connectDB();
  server.listen(ENV.SERVER_PORT || 3000, () => console.log(`Server is ready`));
}

main();

