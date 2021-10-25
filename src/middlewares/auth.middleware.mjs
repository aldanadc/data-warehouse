import jwt from 'jsonwebtoken';
import { validateUserAgainstDB } from '../config/db.mjs';
import { ENV } from "../config/env.mjs";
import ExpressError from "./ExpressError.mjs";
const secret = ENV.JWT_SECRET;

export async function authenticateUser(request, response, next) {
  const user = await validateUserAgainstDB(request.body.logInInfo);
  if (user) {
    const token = jwt.sign({
      user_id: user.user_id,
      first_name: user.first_name,
      email: user.email,
      profile: user.profile
    }, secret, { expiresIn: 30 * 60 });

    request.user = {
      token: token
    }

    response.cookie("jwt", token);
    next();

  } else {
    response.redirect("/login")
  }
}

export function verifyToken(request, response, next) {
  request.currentUser = request.cookies.jwt;
  //console.log(request.currentUser)
  const token = request.currentUser;
  
  if (token && token != null) {
    const tokenInfo = jwt.decode(token);
    request.currentProfile = tokenInfo.profile;
    response.locals.currentUser = tokenInfo.profile;
    return next();
  }else {
    response.locals.currentUser = null;
    throw new ExpressError(401, "Es necesario iniciar sesión para ver esta página")
  }
}


export function isAdmin(request, response, next) {
  const token = request.currentUser;
  const tokenInfo = jwt.decode(token);
  request.currentProfile = tokenInfo.profile;

  if (request.currentProfile === "admin") {
    next();
  } else {
    throw new ExpressError(403, "Solo usuarios administradores pueden realizar esta acción")
  }
}
