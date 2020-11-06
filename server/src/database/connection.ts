require("dotenv").config();
import knex from "knex";

const db = knex({
  client: "pg",
  connection: process.env.POSTGRESURL,
  searchPath: ["knex", "public"],
  useNullAsDefault: true,
  pool: {
    min: 2,
    max: 10,
  },
});
export default db;
