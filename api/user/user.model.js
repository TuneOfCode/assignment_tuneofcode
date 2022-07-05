const { DataTypes } = require("sequelize");
const { sequelize } = require("../init.model");

const User = sequelize.define("user", {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    unique: true,
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  sex: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_leader: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0,
    allowNull: false,
  },
  birth_place: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  birth_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  avatar: {
    type: DataTypes.STRING,
    defaultValue: "https://www.w3schools.com/howto/img_avatar.png",
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

module.exports = User;
