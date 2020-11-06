require("dotenv").config();

import path from "path";
import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";

const transport = nodemailer.createTransport({
  host: process.env.MAILERHOST,
  port: process.env.MAILERPORT,
  auth: {
    user: process.env.MAILERUSER,
    pass: process.env.MAILERPASS,
  },
});

transport.use(
  "compile",
  hbs({
    viewEngine: {
      extName: ".html",
      partialsDir: path.resolve(__dirname, "templates"),
      defaultLayout: false,
    },
    viewPath: path.resolve(__dirname, "templates"),
    extName: ".html",
  })
);

export default transport;
