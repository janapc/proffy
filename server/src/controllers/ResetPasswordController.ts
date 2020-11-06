require("dotenv").config();
import { Request, Response } from "express";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { DateTime } from "luxon";

import mailer from "../services/mailer";
import db from "../database/connection";
import { decrypt, encrypt } from "../utils/crypto";

interface User {
  id: number;
  email: string;
  password: string;
  token: string;
  name: string;
  passwordResetToken?: string;
  passwordResetExpires?: number;
  avatar?: string;
  whatsapp?: string;
  bio?: string;
}

export interface DecryptData {
  email: string;
  token: string;
}

export default class ResetPasswordController {
  /**
   * @name create
   * @async
   * @description This method sends an email to the user to reset the password.
   * @param {Function} req
   * @param {Function} req.body.email email of user.
   * @param {Function} res
   * @returns {string} status 201
   */
  async create(req: Request, res: Response) {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required!" });

    const trx = await db.transaction();

    try {
      const user: User[] = await trx("users").where({ email });
      if (!user.length)
        return res.status(400).json({ message: "User not found" });

      const token = crypto.randomBytes(20).toString("hex");

      const now = DateTime.local()
        .setZone("America/Bahia")
        .plus({ hour: 1 })
        .valueOf();

      await trx("users").where({ id: user[0].id }).update({
        passwordResetToken: token,
        passwordResetExpires: now,
      });

      const data = encrypt({ email, token });

      mailer.sendMail({
        to: email,
        from: process.env.EMAIL,
        template: "/mail/forgot_password",
        context: {
          URL: `http://localhost:3000/reset-password/${data}`,
        },
      });

      await trx.commit();

      return res.status(201).send();
    } catch (error) {
      await trx.rollback();

      return res.status(400).json({
        error: "Unexpected error while reset password of user",
      });
    }
  }

  /**
   * @name update
   * @async
   * @description This method updates the password of the user.
   * @param {Function} req
   * @param {Function} req.body.token token to verify if time no expired.
   * @param {Function} req.body.newPassword  new password of user.
   * @param {Function} res
   * @returns {string} status 200
   */
  async update(req: Request, res: Response) {
    const { token, newPassword } = req.body;

    if (!token || !newPassword)
      return res
        .status(400)
        .json({ message: "token, newPassword is required!" });
    const trx = await db.transaction();

    const [iv, key, encrypted] = token.split(",");
    try {
      const decryptData: DecryptData = JSON.parse(
        decrypt({
          iv,
          key,
          encrypted,
        })
      );

      const user: User[] = await trx("users").where({
        email: decryptData.email,
      });
      if (!user.length)
        return res.status(400).json({ message: "User not found" });

      if (decryptData.token !== user[0].passwordResetToken)
        return res.status(400).json({ message: "Token invalid" });

      let now = DateTime.local().setZone("America/Bahia").valueOf();

      if (now > user[0].passwordResetExpires)
        return res
          .status(400)
          .json({ message: "Token expired, generate a new one" });

      const passwrodCrypt = await bcrypt.hash(newPassword, 10);

      await trx("users").where({ id: user[0].id }).update({
        password: passwrodCrypt,
        passwordResetToken: null,
        passwordResetExpires: null,
      });

      await trx.commit();

      return res.status(200).send();
    } catch (error) {
      await trx.rollback();

      return res.status(400).json({
        error: "Unexpected error while reset password of user",
      });
    }
  }
}
