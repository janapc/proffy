require("dotenv").config();
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import db from "../database/connection";

interface User {
  id: number;
  email: string;
  password: string;
  token: string;
  avatar: string;
}

export default class LoginController {
  /**
   * @name create
   * @async
   * @description This method to make login in application.
   * @param {Function} req
   * @param {Function} req.body.email email of user.
   * @param {Function} req.body.password password of user.
   * @param {Function} res
   * @returns {Object} return a object contain token, email and avatar
   */
  async create(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password is required!" });

    const trx = await db.transaction();
    try {
      const user: User[] = await trx("users").where({ email });
      if (!user.length)
        return res.status(400).json({ message: "User not found" });

      const matchPassword = await bcrypt.compare(password, user[0].password);
      if (!matchPassword)
        return res.status(400).json({ message: "Password not match" });

      jwt.verify(user[0].token, process.env.SECRET, async function (
        err,
        decoded
      ) {
        if (err) {
          let newToken = jwt.sign(
            {
              id: user[0].id,
              email: user[0].email,
            },
            process.env.SECRET,
            { expiresIn: "7d" }
          );
          await trx("users").where({ id: user[0].id }).update({
            token: newToken,
          });
        }
      });

      const newUser: User[] = await trx("users").where({ email });

      await trx.commit();
      return res.status(201).json({
        token: newUser[0].token,
        email: newUser[0].email,
        avatar: newUser[0].avatar,
      });
    } catch (error) {
      await trx.rollback();

      return res.status(400).json({
        error: "Unexpected error while login user",
      });
    }
  }
}
