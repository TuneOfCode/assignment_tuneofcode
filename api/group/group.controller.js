const { msg } = require("../message.controller");
const User = require("../user/user.model");
const Group = require("./group.model");
const GroupService = require("./group.service");

const GroupController = {
  getListGroup: async (req, res) => {
    try {
      const { data, paginate } = await GroupService.getListGroup(req);
      if (data.errors) {
        return msg(res, data.errors.message, undefined, undefined, 400, false);
      }
      return msg(res, "OK", data, paginate);
    } catch (error) {
      return msg(res, error);
    }
  },
  getDetailGroup: async (req, res) => {
    try {
      const data = await GroupService.getDetailGroup(req.params.id);
      if (data.errors) {
        return msg(res, data.errors.message, undefined, undefined, 400, false);
      }
      return msg(res, "OK", data);
    } catch (error) {
      return msg(res, error);
    }
  },
  studying: async (req, res) => {
    try {
      const data = await GroupService.studying();
      if (data.errors) {
        return msg(res, data.errors.message, undefined, undefined, 400, false);
      }
      return msg(
        res,
        `${data.count_group} study groups with ${data.students_studying_on_group} students`,
        data.count_group
      );
    } catch (error) {
      return msg(res, error);
    }
  },
  create: async (req, res) => {
    try {
      const { name, subject, leader_id } = req.body;

      const user = await User.findOne({
        where: {
          id: leader_id,
          is_leader: true,
        },
      });
      const count_leader_teach_group_equal_four = await Group.count({
        where: {
          leader_id: leader_id,
        },
        distinct: true,
      });
      if (!user) {
        return msg(
          res,
          `Leader id ${leader_id} doesn't a leader or not exist`,
          undefined,
          undefined,
          400,
          false
        );
      }
      if (count_leader_teach_group_equal_four >= 3) {
        return msg(
          res,
          `Per leader only max teach 4 group`,
          undefined,
          undefined,
          400,
          false
        );
      }
      const data = await GroupService.create({ name, subject, leader_id });
      if (data.errors) {
        return msg(
          res,
          `name ${name} already exist. Please enter a another name !`,
          undefined,
          undefined,
          400,
          false
        );
      }
      return msg(res, "created successfully", data);
    } catch (error) {
      return msg(res, error);
    }
  },
  update: async (req, res) => {
    try {
      const data = await GroupService.update(req.body, req.params.id);
      if (data.errors) {
        return msg(res, data.errors.message, undefined, undefined, 400, false);
      }
      return msg(res, "updated successfully", data);
    } catch (error) {
      return msg(res, error);
    }
  },
  destroy: async (req, res) => {
    try {
      const data = await GroupService.destroy(req.params.id);
      if (data.errors) {
        return msg(res, data.errors.message, undefined, undefined, 400, false);
      }
      return msg(res, "destroyed successfully", data);
    } catch (error) {
      return msg(res, error);
    }
  },
};

module.exports = GroupController;
