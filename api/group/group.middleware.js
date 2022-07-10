const { check } = require("express-validator");
const Group = require("./group.model");

module.exports = {
  validateGroupName: check("name")
    .trim()
    .custom(async (name) => {
      const existingName = await Group.findOne({
        where: {
          name: name,
        },
      });
      if (existingName) {
        throw new Error(`Group name ${name} already in use`);
      }
    }),
};
