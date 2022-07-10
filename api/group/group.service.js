const { Op } = require("sequelize");
const { LIMIT, PAGE } = require("../constant");
const Group_User = require("../group_user/group_user.model");
const User = require("../user/user.model");
const pagination = require("../util.db");
const Group = require("./group.model");

const GroupService = {
  getListGroup: async (req) => {
    const query = req.query;
    const { search, filter } = query;
    const limit = +query.limit || LIMIT;
    const page = +query.page || PAGE;
    const attributes = [
      "id",
      "name",
      "date_start",
      "subject",
      "created_at",
      "updated_at",
    ];
    const include = [
      {
        model: User,
        as: "leader",
        attributes: ["id", "name", "email", "avatar"],
      },
      {
        model: User,
        as: "students",
        attributes: ["id", "name", "email", "avatar"],
        through: { attributes: [] },
      },
    ];
    let groups;
    try {
      groups = await Group.findAll({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.like]: `%${search ? search : ""}%`,
              },
            },
            {
              subject: {
                [Op.like]: `%${search ? search : ""}%`,
              },
            },
            {
              date_start: {
                [Op.like]: `%${search ? search : ""}%`,
              },
            },
          ],
        },
        attributes: attributes,
        include: include,
      });
      if (filter) {
        groups = await Group.findAll({
          where: {
            name: filter || [],
          },
          attributes: attributes,
          include: include,
        });
      }
      const { data, paginate } = await pagination(
        Group,
        page,
        limit,
        {},
        attributes,
        include
      );
      if (query.limit || query.page) {
        return { data: data, paginate: paginate };
      }
      return { data: groups, paginate: paginate };
    } catch (error) {
      console.log("Error: ", error);
      return error;
    }
  },
  getDetailGroup: async (inputId) => {
    try {
      const group = await Group.findAll({
        where: {
          id: inputId,
        },
        attributes: ["id", "name", "date_start", "subject"],
        include: [
          {
            model: User,
            as: "leader",
            attributes: ["id", "name", "email", "avatar"],
          },
          {
            model: User,
            as: "students",
            attributes: ["id", "name", "email", "avatar"],
            through: { attributes: [] },
          },
        ],
      });
      return group;
    } catch (error) {
      console.log("Error: ", error);
      return error;
    }
  },
  studying: async () => {
    try {
      const count_group = await Group.count();
      const students_studying_on_group = await Group_User.findAndCountAll({
        distinct: true,
        col: "user_id",
      });
      const data = {
        count_group,
        students_studying_on_group: students_studying_on_group.count,
      };
      return data;
    } catch (error) {
      return error;
    }
  },
  create: async (payload) => {
    try {
      return await Group.create(payload);
    } catch (error) {
      console.log("Error: ", error);
      return error;
    }
  },
  update: async (payload, inputId) => {
    try {
      return await Group.update(payload, { where: { id: inputId } });
    } catch (error) {
      console.log("Error: ", error);
      return error;
    }
  },
  destroy: async (inputId) => {
    try {
      await Group_User.destroy({
        where: {
          group_id: inputId,
        },
      });
      return await Group.destroy({
        where: {
          id: inputId,
        },
      });
      // await sequelize.query("ALTER TABLE groups AUTO_INCREMENT = " + inputId);
    } catch (error) {
      console.log("Error: ", error);
      return error;
    }
  },
};

module.exports = GroupService;
