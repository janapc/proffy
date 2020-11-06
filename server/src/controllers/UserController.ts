import { Request, Response } from "express";
import bcrypt from "bcrypt";

import convertHourToMinutes from "../utils/convertHourToMinutes";
import db from "../database/connection";
import convertMinutesToHours from "../utils/convertMinutesToHours";

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
  proffy?: boolean;
}

interface DataUpdateUser {
  name?: string;
  email?: string;
  whatsapp?: string;
  bio?: string;
  subject?: string;
  cost?: number;
  schedule?: string;
}

interface SchehuleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class UserController {
  /**
   * @name index
   * @async
   * @description This method create a new user.
   * @param {Function} req
   * @param {Function} req.userToken token of user.
   * @param {Function} res
   * @returns {string} status 201
   */
  async index(req: Request, res: Response) {
    const token = req.userToken;
    let classesUser = {
      subject: "",
      cost: "",
      schedule: [],
    };

    const trx = await db.transaction();

    try {
      const searchUser: User[] = await trx("users").where({ token });
      if (!searchUser.length)
        return res.status(400).json({ message: "User not found" });

      if (searchUser[0].proffy) {
        const searchClassesUser = await trx("classes").where({
          user_id: searchUser[0].id,
        });

        if (searchClassesUser.length) {
          classesUser.cost = searchClassesUser[0].cost;
          classesUser.subject = searchClassesUser[0].subject;
          let searchClassSchedule = await trx("class_schedule").where({
            class_id: searchClassesUser[0].id,
          });

          if (searchClassSchedule.length) {
            let newClassSchedule = searchClassSchedule.map((schedule) => {
              return {
                ...schedule,
                to: convertMinutesToHours(Number(schedule.to)),
                from: convertMinutesToHours(Number(schedule.from)),
              };
            });

            classesUser.schedule.push(...newClassSchedule);
          }
        }
      }

      let user = {
        name: searchUser[0].name,
        email: searchUser[0].email,
        avatar: searchUser[0].avatar,
        whatsapp: searchUser[0].whatsapp,
        bio: searchUser[0].bio,
        proffy: searchUser[0].proffy,
        ...classesUser,
      };

      await trx.commit();

      return res.status(200).json({ user });
    } catch (error) {
      await trx.rollback();

      return res.status(400).json({
        error: "Unexpected error while get a user",
      });
    }
  }

  /**
   * @name create
   * @async
   * @description This method create a new user.
   * @param {Function} req
   * @param {Function} req.email whatsapp of user.
   * @param {Function} req.password password of user.
   * @param {Function} req.name name of user.
   * @param {Function} req.proffy if is a teacher.
   * @param {Function} res
   * @returns {string} status 201
   */
  async create(req: Request, res: Response) {
    const { email, password, name, proffy } = req.body;

    if (!email || !password || !name)
      return res
        .status(400)
        .json({ message: "Email, name and password is required!" });

    const trx = await db.transaction();

    try {
      const user = await trx("users").where({ email });

      if (user.length)
        return res.status(400).json({ message: "Email is already in use" });

      const hashPassword = await bcrypt.hash(password, 10);

      await trx("users").insert({
        email,
        name,
        password: hashPassword,
        proffy: proffy === "true" ? true : false,
        avatar: req.file ? req.file.filename : "",
      });

      await trx.commit();

      return res.status(201).send();
    } catch (error) {
      await trx.rollback();

      return res.status(400).json({
        error: "Unexpected error while creating new user",
      });
    }
  }

  /**
   * @name update
   * @async
   * @description This method updates the fields of the teacher in your profile.
   * @param {Function} req
   * @param {Object} req.body information of user.
   * @param {Function} res
   * @returns {string} status 201
   */
  async update(req: Request, res: Response) {
    const data: DataUpdateUser = req.body;
    const trx = await db.transaction();
    try {
      const user: User[] = await trx("users").where({ email: data.email });
      if (!user.length)
        return res.status(400).json({ message: "User not found" });

      await trx("users")
        .where({ id: user[0].id })
        .update({
          name: data.name,
          email: data.email,
          avatar: req.file ? req.file.filename : user[0].avatar,
          whatsapp: data.whatsapp,
          bio: data.bio,
        });

      if (user[0].proffy) {
        const { rows: insertedClassesIds } = await trx.raw(
          `INSERT INTO classes (subject, cost, user_id) VALUES ('${data.subject}', ${data.cost}, ${user[0].id}) ON CONFLICT (user_id) DO UPDATE SET subject='${data.subject}', cost=${data.cost}, user_id=${user[0].id} RETURNING id;`
        );

        if (data.schedule) {
          const { schedule } = JSON.parse(data.schedule);

          const userClassSchedule = await trx("class_schedule").where({
            class_id: insertedClassesIds[0].id,
          });

          if (userClassSchedule.length) {
            await trx("class_schedule")
              .where({ class_id: insertedClassesIds[0].id })
              .del();
          }

          const classSchedule = schedule.map((scheduleItem: SchehuleItem) => {
            return {
              class_id: insertedClassesIds[0].id,
              week_day: scheduleItem.week_day,
              from: convertHourToMinutes(scheduleItem.from),
              to: convertHourToMinutes(scheduleItem.to),
            };
          });

          await trx("class_schedule").insert(classSchedule);
        }
      }

      await trx.commit();

      return res.status(201).send();
    } catch (error) {
      await trx.rollback();

      return res.status(400).json({
        error: "Unexpected error while update user",
      });
    }
  }
}
