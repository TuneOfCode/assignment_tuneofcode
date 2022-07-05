const { DataTypes } = require("sequelize");
const { sequelize } = require("../init.model");

const Group = sequelize.define("group", {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  date_start: {
    type: DataTypes.DATE,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  leader_id: {
    type: DataTypes.INTEGER,
  },
  createdAt: {
    field: "created_at",
    type: DataTypes.DATE,
  },
  updatedAt: {
    field: "updated_at",
    type: DataTypes.DATE,
  },
});
module.exports = Group;
