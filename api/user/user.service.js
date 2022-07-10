const { Op } = require("sequelize");
const { LIMIT, PAGE } = require("../constant");
const Group = require("../group/group.model");
const Group_User = require("../group_user/group_user.model");
const pagination = require("../util.db");
const User = require("./user.model");

const UserService = {
  getAll: async (req) => {
    const query = req.query;
    const limit = +query.limit || LIMIT;
    const page = +query.page || PAGE;
    const attributes = [
      "id",
      "name",
      "sex",
      "birth_date",
      "birth_place",
      "email",
      "avatar",
      "created_at",
      "updated_at",
    ];
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
      const { data, paginate } = await pagination(
        User,
        page,
        limit,
        {},
        attributes
      );
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
    const { search, filter } = query;
    const limit = +query.limit || LIMIT;
    const page = +query.page || PAGE;
    const attributes = [
      "id",
      "name",
      "sex",
      "birth_date",
      "birth_place",
      "email",
      "avatar",
    ];
    const include = [
      {
        model: Group,
        attributes: ["id", "name"],
        through: { attributes: [] },
      },
    ];
    let users;
    try {
      users = await User.findAll({
        where: {
          [Op.and]: [
            { is_leader: false },
            {
              [Op.or]: [
                {
                  name: { [Op.like]: `%${search ? search : ""}%` },
                },
                {
                  birth_place: {
                    [Op.like]: `%${search ? search : ""}%`,
                  },
                },
                {
                  email: { [Op.like]: `%${search ? search : ""}%` },
                },
              ],
            },
          ],
        },
        distinct: true,
        attributes: attributes,
        include: include,
      });
      if (filter) {
        users = await User.findAll({
          attributes: attributes,
          include: {
            model: Group,
            attributes: ["id", "name"],
            where: {
              name: filter || [],
            },
            through: { attributes: [] },
          },
        });
      }
      const { data, paginate } = await pagination(
        User,
        page,
        limit,
        {
          is_leader: false,
        },
        attributes,
        include
      );
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
    const attributes = [
      "id",
      "name",
      "sex",
      "birth_date",
      "birth_place",
      "email",
      "avatar",
    ];
    const include = [
      {
        model: Group,
        as: "taught",
        attributes: ["id", "name"],
      },
    ];
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
        distinct: true,
        attributes: attributes,
        include: include,
      });
      const { data, paginate } = await pagination(
        User,
        page,
        limit,
        {
          is_leader: true,
        },
        attributes,
        include
      );
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
      const students_registered = await User.count({
        where: {
          is_leader: 0,
        },
      });
      return students_registered;
    } catch (error) {
      console.log("Error: ", error);
      return error;
    }
  },
  joinGroup: async (req, _id = null) => {
    try {
      let { id, group_ids } = req.body;
      if (_id) id = _id;
      const user = await User.findOne({
        where: {
          id: id,
          is_leader: false,
        },
      });
      const count_user_join_group_equal_four = await Group_User.count({
        where: {
          user_id: id,
        },
        distinct: true,
      });
      if (!user) {
        return {
          message: `user_id ${id} does not exist or not student`,
          statusCode: 400,
          status: false,
        };
      }
      let datas = [],
        group_ids_array = [];
      for (let groupId of group_ids) {
        const group = await Group.findOne({
          where: {
            id: groupId,
          },
        });
        const user_join_group = await Group_User.findOne({
          where: {
            user_id: id,
            group_id: groupId,
          },
        });
        if (!group) {
          return {
            message: `group_id ${groupId} does not exist`,
            statusCode: 400,
            status: false,
          };
        }
        if (user_join_group) {
          return {
            message: `student id has ${id} joined group id has ${groupId}`,
            statusCode: 400,
            status: false,
          };
        }
        if (count_user_join_group_equal_four > 3 || group_ids.length >= 5) {
          return {
            message: `Per user only max join 4 group`,
            statusCode: 400,
            status: false,
          };
        }
        group_ids_array.push(groupId);
      }
      for (let groupId of group_ids_array) {
        const data = await Group_User.create({
          user_id: id,
          group_id: groupId,
        });
        datas.push(data);
      }
      group_ids_string = group_ids_array.join(", ");
      return {
        message: `Student has id is ${id} joined groups has id is [${group_ids_string}] sucessfully`,
        data: datas,
      };
    } catch (error) {
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
  destroyJoinGroup: async (inputId) => {
    try {
      const data = Group_User.destroy({
        where: {
          user_id: inputId,
        },
      });
      return {
        message: `destroyed join group of studentId ${req.params.studentId} successfully`,
        data: data,
      };
    } catch (error) {
      return error;
    }
  },
};

module.exports = UserService;
