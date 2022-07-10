const { check } = require("express-validator");
const User = require("./user.model");

module.exports = {
  validateEmail: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid email")
    .custom(async (email) => {
      const existingEmail = await User.findOne({
        where: {
          email: email,
        },
      });
      if (existingEmail) {
        throw new Error(`Email ${email} already in use`);
      }
    }),
};
