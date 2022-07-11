require("dotenv").config();
const DEV_ENV = "development";
const NODE_ENV = process.env.NODE_ENV;
module.exports = {
  port: process.env.PORT || 8888,
  NODE_ENV,
  domain:
    NODE_ENV !== DEV_ENV
      ? process.env.DOMAIN || process.env.HOST
      : process.env.DEV_DOMAIN ||
        process.env.DEV_HOST ||
        `${process.env.DEV_HOST}:${process.env.PORT}`,
  host: NODE_ENV !== DEV_ENV ? process.env.HOST : process.env.DEV_HOST,
  db_host: NODE_ENV !== DEV_ENV ? process.env.DB_HOST : process.env.DEV_DB_HOST,
  username:
    NODE_ENV !== DEV_ENV
      ? process.env.DB_USERNAME
      : process.env.DEV_DB_USERNAME,
  password:
    NODE_ENV !== DEV_ENV
      ? process.env.DB_PASSWORD
      : process.env.DEV_DB_PASSWORD,
  database:
    NODE_ENV !== DEV_ENV ? process.env.DB_NAME : process.env.DEV_DB_NAME,
  dialect: NODE_ENV !== DEV_ENV ? process.env.DB_TYPE : process.env.DEV_DB_TYPE,
};
