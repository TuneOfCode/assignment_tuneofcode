const User = require("../user/user.model");
const Group_User = require("./group_user.model");

const Group_UserService = {
  getAll: async () => {
    try {
      const group_user = await Group_User.findAll();
      return group_user;
    } catch (error) {
      console.log("Error: ", error);
      throw error;
    }
  },
};

module.exports = Group_UserService;
