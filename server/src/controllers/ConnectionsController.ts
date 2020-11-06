import { Request, Response } from "express";
import db from "../database/connection";

export default class ConnectionsController {
  /**
   * @name index
   * @async
   * @description This method gets a count of all connections and proffys.
   * @param {Function} req
   * @param {Function} res
   * @returns {Object} total connections and total fo proffys
   */
  async index(req: Request, res: Response) {
    const connections = await db("connections").count("* as totalConnections");
    const connectionsProffys = await db("users")
      .where({ proffy: true })
      .count("* as totalProffys");

    const { totalConnections } = connections[0];
    const { totalProffys } = connectionsProffys[0];

    return res.json({ totalConnections, totalProffys });
  }

  /**
   * @name create
   * @async
   * @description This method create a new connection.
   * @param {Function} req
   * @param {Function} req.body.user_id id of user.
   * @param {Function} res
   * @returns {string} status 201
   */
  async create(req: Request, res: Response) {
    const { user_id } = req.body;

    await db("connections").insert({
      user_id,
    });

    return res.status(201).send();
  }
}
