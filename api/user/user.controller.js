const Group = require("../group/group.model");
const Group_User = require("../group_user/group_user.model");
const { msg } = require("../message.controller");
const User = require("./user.model");
const UserService = require("./user.service");

const UserController = {
  getAll: async (req, res) => {
    try {
      const { data, paginate } = await UserService.getAll(req);
      if (data.errors) {
        return msg(res, data.errors, undefined, undefined, false);
      }
      return msg(res, "OK", data, paginate);
    } catch (error) {
      msg(res, error);
    }
  },
  getListStudent: async (req, res) => {
    try {
      const { data, paginate } = await UserService.getListStudent(req);
      if (data.errors) {
        return msg(res, data.errors, undefined, undefined, false);
      }
      return msg(res, "OK", data, paginate);
    } catch (error) {
      msg(res, error);
    }
  },
  getListLeader: async (req, res) => {
    try {
      const { data, paginate } = await UserService.getListLeader(req);
      if (data.errors) {
        return msg(res, data.errors, undefined, undefined, false);
      }
      return msg(res, "OK", data, paginate);
    } catch (error) {
      msg(res, error);
    }
  },
  getDetailStudent: async (req, res) => {
    try {
      const data = await UserService.getDetailStudent(req.params.id);
      if (data.errors) {
        return msg(res, data.errors, undefined, undefined, false);
      }
      return msg(res, "OK", data);
    } catch (error) {
      msg(res, error);
    }
  },
  registered: async (req, res) => {
    try {
      const data = await UserService.registered();
      if (data.errors) {
        return msg(res, data.errors, undefined, undefined, false);
      }
      return msg(res, `${data} student registered`, data);
    } catch (error) {}
  },
  create: async (req, res) => {
    try {
      const { name, email, sex, birth_place, birth_date } = req.body;
      const data = await UserService.create({
        name,
        email,
        sex,
        birth_place,
        birth_date,
      });
      if (data.errors) {
        return msg(
          res,
          `email ${email} already exists. Please enter another email !`,
          undefined,
          undefined,
          false
        );
      }
      console.log(">>>>>> PAYLOAD: ", req.body);
      return msg(res, "created successfully", data);
    } catch (error) {
      msg(res, error);
    }
  },
  joinGroup: async (req, res) => {
    try {
      const { user_id, group_id } = req.body;
      const user = await User.findOne({
        where: {
          id: user_id,
          is_leader: false,
        },
      });
      const group = await Group.findOne({
        where: {
          id: group_id,
        },
      });
      const user_join_group = await Group_User.findOne({
        where: {
          user_id: user_id,
          group_id: group_id,
        },
      });
      const count_user_join_group_equal_four = await Group_User.count({
        where: {
          user_id: user_id,
        },
        distinct: true,
      });
      console.log(
        ">>>>>> count user join group_equal four: ",
        count_user_join_group_equal_four
      );
      if (!user) {
        console.log(`>>>> USER: ${user_id} does not exist or not student`);
        return msg(
          res,
          `user_id ${user_id} does not exist or not student`,
          undefined,
          undefined,
          false
        );
      }
      if (!group) {
        console.log(`>>>> GROUP: ${group_id} does not exist`);
        return msg(
          res,
          `group_id ${group_id} does not exist`,
          undefined,
          undefined,
          false
        );
      }
      if (user_join_group) {
        return msg(
          res,
          `student id has ${user_id} joined group id has ${group_id}`
        );
      }
      if (count_user_join_group_equal_four > 3) {
        return msg(
          res,
          `Per user only max join 4 group`,
          undefined,
          undefined,
          false
        );
      }
      const data = await Group_User.create({ user_id, group_id });
      if (data.errors) {
        return msg(res, data.errors, undefined, undefined, false);
      }
      return msg(
        res,
        `Student has id is ${user_id} joined group has id is ${group_id} sucessfully`,
        data
      );
    } catch (error) {
      msg(res, error);
    }
  },
  update: async (req, res) => {
    try {
      const { is_leader } = req.body;
      if (is_leader === 0) {
        const leader_in_group = await Group.findAll({
          where: {
            leader_id: req.params.id,
          },
        });
        if (leader_in_group)
          return msg(
            res,
            `leader id ${req.params.id} has taught at least one group so the role cannot be changed`,
            undefined,
            undefined,
            false
          );
      }
      const data = await UserService.update(req.body, req.params.id);
      if (data.errors) {
        return msg(res, data.errors, undefined, undefined, false);
      }
      console.log(">>>>>> PAYLOAD: ", req.body, ">>> ID: ", req.params.id);
      return msg(res, "updated successfully", data);
    } catch (error) {
      msg(res, error);
    }
  },
  destroy: async (req, res) => {
    try {
      const data = await UserService.destroy(req.params.id);
      if (data.errors) {
        return msg(res, data.errors, undefined, undefined, false);
      }
      return msg(res, "destroyed successfully", data);
    } catch (error) {
      msg(res, error);
    }
  },
};

module.exports = UserController;
