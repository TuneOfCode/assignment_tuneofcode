const UserRouter = require("./user/user.router");
const GroupRouter = require("./group/group.router");
const rootRouter = (app) => {
  app.use("/api/v1/users", UserRouter);
  app.use("/api/v1/groups", GroupRouter);
};

module.exports = rootRouter;
