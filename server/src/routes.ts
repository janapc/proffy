require("dotenv").config();
import express from "express";
import multer from "multer";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import multerConfig from "./config/multer";

import ClassesController from "./controllers/ClassesController";
import ConnectionsController from "./controllers/ConnectionsController";
import UserController from "./controllers/UserController";
import LoginController from "./controllers/LoginController";
import ResetPasswordController from "./controllers/ResetPasswordController";
import AuthController from "./controllers/AuthController";

const routes = express.Router();
const upload = multer(multerConfig);

const classesController = new ClassesController();
const connectionController = new ConnectionsController();
const userController = new UserController();
const loginController = new LoginController();
const resetPasswordController = new ResetPasswordController();
const authController = new AuthController();

function checkTokenIsValid(req: Request, res: Response, next: Function) {
  if (req.headers.authorization) {
    const bearer = req.headers.authorization.split(" ");
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, process.env.SECRET, function (err, decoded) {
      if (err)
        return res
          .status(500)
          .json({ message: "Failed to authenticate token." });
      req.userToken = bearerToken;
      next();
    });
  }
}

routes.get("/classes", checkTokenIsValid, classesController.index);

routes.get("/connections", connectionController.index);
routes.post("/connections", connectionController.create);

routes.get("/user", checkTokenIsValid, userController.index);
routes.post("/user", upload.single("avatar"), userController.create);
routes.put(
  "/user",
  checkTokenIsValid,
  upload.single("avatar"),
  userController.update
);

routes.post("/login", loginController.create);

routes.post("/forgot_password", resetPasswordController.create);
routes.put("/reset_password", resetPasswordController.update);

routes.get("/auth", checkTokenIsValid, authController.index);

export default routes;
