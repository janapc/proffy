import { Request, Response } from "express";

import db from "../database/connection";
import convertHourToMinutes from "../utils/convertHourToMinutes";

export default class ClassesController {
  /**
   * @name index
   * @async
   * @description This method gets all proffys by filter
   * @param {Function} req
   * @param {Object} req.query filters
   * @param {Function} res
   * @returns {Array} total proffys
   */
  async index(req: Request, res: Response) {
    const filters = req.query;
    const week_day = filters.week_day as string;
    const subject = filters.subject as string;
    const time = filters.time as string;

    if (!filters.week_day || !filters.subject || !filters.time) {
      return res.status(400).json({
        error: "Missing filters to search classes",
      });
    }

    const timeInMinutes = convertHourToMinutes(time);

    const classes = await db("classes")
      .whereExists(function () {
        this.select("class_schedule.*")
          .from("class_schedule")
          .whereRaw("class_schedule.week_day = ??", [Number(week_day)])
          .whereRaw("class_schedule.from <= ??", [timeInMinutes])
          .whereRaw("class_schedule.to > ??", [timeInMinutes]);
      })
      .where("classes.subject", "=", subject.toLowerCase())
      .join("users", "classes.user_id", "=", "users.id")
      .select([
        "classes.*",
        "users.name",
        "users.avatar",
        "users.bio",
        "users.whatsapp",
      ]);
    let formatData = [...classes];
    for (let i = 0; i < classes.length; i++) {
      const classesSchedule = await db("class_schedule").where({
        class_id: classes[i].id,
      });
      formatData[i].schedule = classesSchedule;
    }

    return res.json(formatData);
  }
}
