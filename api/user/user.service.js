const { Op } = require("sequelize");
const { LIMIT, PAGE } = require("../constant");
const Group = require("../group/group.model");
const { sequelize } = require("../init.model");
const pagination = require("../util.db");
const User = require("./user.model");

const UserService = {
  getAll: async (req) => {
    const query = req.query;
    const limit = +query.limit || LIMIT;
    const page = +query.page || PAGE;
    try {
      const users = await User.findAll({
        where: {
          [Op.or]: [
            {
              name: { [Op.like]: `%${query.search ? query.search : ""}%` },
            },
            {
              birth_place: {
                [Op.like]: `%${query.search ? query.search : ""}%`,
              },
            },
            {
              email: { [Op.like]: `%${query.search ? query.search : ""}%` },
            },
          ],
        },
      });
      const { data, paginate } = await pagination(User, page, limit);
      if (query.limit || query.page) {
        return { data: data, paginate: paginate };
      }
      return { data: users, paginate: paginate };
    } catch (error) {
      console.log("Error: ", error);
      return error;
    }
  },
  getListStudent: async (req) => {
    const query = req.query;
    const limit = +query.limit || LIMIT;
    const page = +query.page || PAGE;
    try {
      const users = await User.findAll({
        where: {
          [Op.and]: [
            { is_leader: false },
            {
              [Op.or]: [
                {
                  name: { [Op.like]: `%${query.search ? query.search : ""}%` },
                },
                {
                  birth_place: {
                    [Op.like]: `%${query.search ? query.search : ""}%`,
                  },
                },
                {
                  email: { [Op.like]: `%${query.search ? query.search : ""}%` },
                },
              ],
            },
          ],
        },
        distinct: true,
        attributes: [
          "id",
          "name",
          "sex",
          "birth_date",
          "birth_place",
          "email",
          "avatar",
        ],
        include: [
          {
            model: Group,
            attributes: ["id", "name"],
            through: { attributes: [] },
          },
        ],
      });
      const { data, paginate } = await pagination(User, page, limit, {
        is_leader: false,
      });
      if (query.limit || query.page) {
        return { data: data, paginate: paginate };
      }
      return { data: users, paginate: paginate };
    } catch (error) {
      console.log("Error: ", error);
      return error;
    }
  },
  getListLeader: async (req) => {
    const query = req.query;
    const limit = +query.limit || LIMIT;
    const page = +query.page || PAGE;
    try {
      const users = await User.findAll({
        where: {
          [Op.and]: [
            { is_leader: true },
            {
              [Op.or]: [
                {
                  name: { [Op.like]: `%${query.search ? query.search : ""}%` },
                },
                {
                  birth_place: {
                    [Op.like]: `%${query.search ? query.search : ""}%`,
                  },
                },
                {
                  email: { [Op.like]: `%${query.search ? query.search : ""}%` },
                },
              ],
            },
          ],
        },
        limit: limit,
        distinct: true,
        attributes: [
          "id",
          "name",
          "sex",
          "birth_date",
          "birth_place",
          "email",
          "avatar",
        ],
        include: [
          {
            model: Group,
            as: "taught",
            attributes: ["id", "name"],
          },
        ],
      });
      const { data, paginate } = await pagination(User, page, limit, {
        is_leader: true,
      });
      if (query.limit || query.page) {
        return { data: data, paginate: paginate };
      }
      return { data: users, paginate: paginate };
    } catch (error) {
      console.log("Error: ", error);
      return error;
    }
  },
  getDetailStudent: async (inputId) => {
    try {
      const users = await User.findAll({
        where: {
          is_leader: false,
          id: inputId,
        },
        include: {
          model: Group,
          attributes: ["id", "name", "subject", "date_start"],
          through: {
            attributes: [],
          },
          include: {
            model: User,
            as: "leader",
            attributes: ["id", "name", "email", "avatar"],
          },
        },
      });
      return users;
    } catch (error) {
      console.log("Error: ", error);
      return error;
    }
  },
  registered: async () => {
    try {
      const students_registered = await User.count();
      return students_registered;
    } catch (error) {
      console.log("Error: ", error);
      return error;
    }
  },
  create: async (payload) => {
    try {
      return await User.create(payload);
    } catch (error) {
      console.log("Error: ", error);
      return error;
    }
  },
  update: async (payload, inputId) => {
    try {
      return await User.update(payload, { where: { id: inputId } });
    } catch (error) {
      console.log("Error: ", error);
      return error;
    }
  },
  destroy: async (inputId) => {
    try {
      return await User.destroy({
        where: {
          id: inputId,
        },
      });
      // await sequelize.query("ALTER TABLE users AUTO_INCREMENT = " + inputId);
    } catch (error) {
      console.log("Error: ", error);
      return error;
    }
  },
};

module.exports = UserService;
