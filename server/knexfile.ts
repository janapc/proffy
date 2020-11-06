require("dotenv").config();
import path from "path";

module.exports = {
  client: "pg",
  connection: process.env.POSTGRESURL,
  searchPath: ["knex", "public"],
  migrations: {
    directory: path.resolve(__dirname, "src", "database", "migrations"),
  },
  useNullAsDefault: true,
};
