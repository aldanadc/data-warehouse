import { Router } from "express";
import { createUser, getUsers, editUser, deleteUser } from "../config/db.mjs";
import { isAdmin } from "../middlewares/auth.middleware.mjs";
import { verifyToken } from "../middlewares/auth.middleware.mjs";
import catchAsync from "../utils/catchAsync.mjs";
import ExpressError from "../utils/ExpressError.mjs";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
const ObjectID = mongoose.Types.ObjectId;

export function getRouter() {
  const router = new Router();

  router.get("/users", verifyToken, isAdmin, catchAsync(showAllUsers));
  router.get("/users/new", verifyToken, isAdmin, renderNewUserForm);
  router.get("/users/:id/edit", verifyToken, isAdmin, catchAsync(renderEditUserForm));
  router.put("/users/:id/edit", verifyToken, isAdmin, catchAsync(editOneUser));
  router.delete("/users/:id", verifyToken, isAdmin, catchAsync(deleteOneUser));
  router.post("/users", verifyToken, isAdmin, catchAsync(createNewUser));
  return router;
}


const renderNewUserForm = (request, response) => {
  const user = undefined;
  response.render("users/newEditUser", { user });
}

const createNewUser = async (request, response, next) => {
  if (!request.body.newUser) throw new ExpressError(400, "Información inválida");
  const { email } = request.body.newUser;
  const existingUser = await getUsers({email: email});
  if (existingUser.length > 0) {
    throw new ExpressError(400, "Ya existe un usuario registrado con ese email");
  }else {
    const { password } = request.body.newUser;
    const hashedPassword = await hashPassword(password);
    request.body.newUser.password = hashedPassword;
    await createUser(request.body.newUser);
    response.redirect("users");
  }
}

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, salt);
  return hash
}

const showAllUsers = async (request, response) => {
  const users = await getUsers();
  const currentProfile = request.currentProfile;
  response.render("users/allUsers", { users, currentProfile } );
}


const renderEditUserForm = async (request, response, next) => {
  const { id } = request.params;
  if (!ObjectID.isValid(id)) {
    return next(new ExpressError(400, "ID de usuario inválido"));
  }
  const user = await getUsers({_id: id});
  if (user === null || user.length === 0) throw new ExpressError(404, "Usuario inexistente")
  response.render("users/newEditUser", { user });
}

const editOneUser = async (request, response, next) => {
  const { id } = request.params;
  if (!ObjectID.isValid(id)) {
    return next(new ExpressError(400, "ID de usuario inválido"));
  }
  if (!request.body.editUser) throw new ExpressError(400, "Información inválida");
  const userInfo = {...request.body.editUser};
  await editUser(id, userInfo);
  response.redirect("/users");
}

const deleteOneUser = async (request, response, next) => {
  const { id } = request.params;
  if (!ObjectID.isValid(id)) {
    return next(new ExpressError(400, "ID de usuario inválido"));
  }
  const deletedUser = await deleteUser(id);
  if (deletedUser === null) throw new ExpressError(404, "Usuario inexistente")
  response.redirect("/users");
}


