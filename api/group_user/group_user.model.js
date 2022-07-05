const { DataTypes } = require("sequelize");
const Group = require("../group/group.model");
const { sequelize } = require("../init.model");
const User = require("../user/user.model");

const Group_User = sequelize.define("groups_users", {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  group_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
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
User.hasMany(Group, {
  foreignKey: "leader_id",
  as: "taught",
});
Group.belongsTo(User, {
  as: "leader",
  foreignKey: "leader_id",
});
User.belongsToMany(Group, {
  through: "groups_users",
});
Group.belongsToMany(User, {
  through: "groups_users",
  as: "students",
});
module.exports = Group_User;
