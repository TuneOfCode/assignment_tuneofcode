const { DataTypes } = require("sequelize");
const Group = require("../group/group.model");
const { sequelize } = require("../init.model");
const User = require("../user/user.model");

const Group_User = sequelize.define("groups_users", {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  group_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
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
