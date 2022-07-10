// const Group = require("../group/group.model");
// const Group_User = require("../group_user/group_user.model");
const { msg } = require("../message.controller");
// const User = require("./user.model");
const UserService = require("./user.service");

const UserController = {
  getAll: async (req, res) => {
    try {
      const { data, paginate } = await UserService.getAll(req);
      if (data.errors) {
        return msg(
          res,
          data.errors[0].message,
          undefined,
          undefined,
          400,
          false
        );
      }
      return msg(res, "OK", data, paginate);
    } catch (error) {
      return msg(res, error);
    }
  },
  getListStudent: async (req, res) => {
    try {
      const { data, paginate } = await UserService.getListStudent(req);
      if (data.errors) {
        return msg(
          res,
          data.errors[0].message,
          undefined,
          undefined,
          400,
          false
        );
      }
      return msg(res, "OK", data, paginate);
    } catch (error) {
      return msg(res, error);
    }
  },
  getListLeader: async (req, res) => {
    try {
      const { data, paginate } = await UserService.getListLeader(req);
      if (data.errors) {
        return msg(
          res,
          data.errors[0].message,
          undefined,
          undefined,
          400,
          false
        );
      }
      return msg(res, "OK", data, paginate);
    } catch (error) {
      return msg(res, error);
    }
  },
  getDetailStudent: async (req, res) => {
    try {
      const data = await UserService.getDetailStudent(req.params.id);
      if (data.errors) {
        return msg(
          res,
          data.errors[0].message,
          undefined,
          undefined,
          400,
          false
        );
      }
      return msg(res, "OK", data);
    } catch (error) {
      return msg(res, error);
    }
  },
  registered: async (req, res) => {
    try {
      const data = await UserService.registered();
      if (data.errors) {
        return msg(
          res,
          data.errors[0].message,
          undefined,
          undefined,
          400,
          false
        );
      }
      return msg(res, `${data} student registered`, data);
    } catch (error) {
      return msg(res, error);
    }
  },

  joinGroup: async (req, res) => {
    try {
      const datas = await UserService.joinGroup(req);
      return msg(
        res,
        datas.message,
        datas.data,
        undefined,
        datas.statusCode,
        datas.status
      );
    } catch (error) {
      return msg(res, error);
    }
  },
  create: async (req, res) => {
    try {
      const { name, email, sex, birth_place, birth_date, group_ids } = req.body;
      if (group_ids) console.log(">>>>>>> GROUP_IDS: ", group_ids);
      const data = await UserService.create({
        name,
        email,
        sex,
        birth_place,
        birth_date,
      });
      if (data.errors) {
        console.log(">>>> ERROS: ", data.errors[0].message);
        return msg(
          res,
          data.errors[0].message,
          undefined,
          undefined,
          400,
          false
        );
      }
      const { id } = data;
      console.log(">>>>>>>> CURRENT ID: ", id);
      await UserService.joinGroup(req, id);
      return msg(res, "created successfully", data);
    } catch (error) {
      return msg(res, error);
    }
  },
  update: async (req, res) => {
    try {
      const { is_leader } = req.body;
      if (is_leader) {
        return msg(
          res,
          `user ${req.params.id} has no permissions`,
          undefined,
          undefined,
          400,
          false
        );
      }
      console.log(">>>>>> GROUP_IDS: ", req.body.group_ids);
      if (req.body.group_ids) {
        await UserService.destroyJoinGroup(req.params.id);
        const data = await UserService.update(req.body, req.params.id);
        await UserService.joinGroup(req, req.params.id);
        if (data.errors) {
          return msg(res, data.errors, undefined, undefined, false);
        }
        const payload = req.body;
        const payloads = { ...payload, id: +req.params.id };
        console.log(">>>>>> PAYLOAD: ", payloads, ">>> ID: ", req.params.id);
        return msg(res, "updated successfully", payloads);
      }
      const data = await UserService.update(req.body, req.params.id);
      if (data.errors) {
        return msg(
          res,
          data.errors[0].message,
          undefined,
          undefined,
          400,
          false
        );
      }
      const payload = req.body;
      const payloads = { ...payload, id: +req.params.id };
      console.log(">>>>>> PAYLOAD: ", payloads, ">>> ID: ", req.params.id);
      return msg(res, "updated successfully", payloads);
    } catch (error) {
      return msg(res, error);
    }
  },
  destroy: async (req, res) => {
    try {
      await UserService.destroyJoinGroup(req.params.id);
      const data = await UserService.destroy(req.params.id);
      if (data.errors) {
        return msg(
          res,
          data.errors[0].message,
          undefined,
          undefined,
          400,
          false
        );
      }
      return msg(res, "destroyed successfully", data);
    } catch (error) {
      return msg(res, error);
    }
  },
  destroyJoinGroup: async (req, res) => {
    try {
      const { message, data } = UserService.destroyJoinGroup(
        req.params.studentId
      );
      if (data.errors) {
        return msg(
          res,
          data.errors[0].message,
          undefined,
          undefined,
          400,
          false
        );
      }
      return msg(res, message, data);
    } catch (error) {
      return msg(res, error);
    }
  },
};

module.exports = UserController;
