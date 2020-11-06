require("dotenv").config();
import { Request, Response } from "express";

import db from "../database/connection";

interface User {
  id: number;
  email: string;
  password: string;
  token: string;
  avatar: string;
}

export default class AuthController {
  /**
   * @name index
   * @async
   * @description This method to get user information
   * @param {Function} req
   * @param {Function} req.userToken token of user.
   * @param {Function} res
   * @returns {Object} return a object contain avatar and email of user
   */
  async index(req: Request, res: Response) {
    if (!req.userToken) return res.status(400).send();

    try {
      const user: User[] = await db("users").where({ token: req.userToken });
      if (!user.length)
        return res.status(400).json({ message: "User not found" });

      return res.status(201).json({
        email: user[0].email,
        avatar: user[0].avatar,
      });
    } catch (error) {
      return res.status(400).json({
        error: "Unexpected error while login user",
      });
    }
  }
}
