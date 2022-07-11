const { host, database, username, password, dialect } = require("./db.config");
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: dialect,
  define: {
    underscored: true,
  },
});

const connection = () => {
  try {
    sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    sequelize.close();
  }
};

module.exports = {
  connection,
  sequelize,
};
