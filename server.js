const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const { connection } = require("./api/init.model");
const rootRouter = require("./api/init.router");
const relationship = require("./api/relationship");
const { msg } = require("./api/message.controller");
const host = process.env.HOST;
const port = process.env.PORT || 8888;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
connection();
relationship();
app.get("/", async (req, res) => {
  res.json({
    APIs: [
      { "[GET] users": `http://${host}:${port}/api/v1/users` },
      { "[GET] students": `http://${host}:${port}/api/v1/users/students` },
      {
        "[GET] student_detail": `http://${host}:${port}/api/v1/users/student/detail/{id}`,
      },
      { "[GET] leaders": `http://${host}:${port}/api/v1/users/leaders` },
      {
        "[GET] student registered": `http://${host}:${port}/api/v1/users/students/registered`,
      },
      { "[POST] create_user": `http://${host}:${port}/api/v1/users/create` },
      {
        "[POST] join_group": `http://${host}:${port}/api/v1/users/join-group`,
      },
      { "[PATCH] edit_user": `http://${host}:${port}/api/v1/users/edit/:id` },
      {
        "[DELETE] detroy_user": `http://${host}:${port}/api/v1/users/destroy/:id`,
      },
      {
        "[DELETE] detroy_join_group_of_student": `http://${host}:${port}/api/v1/users/destroy/join-group/:studentId`,
      },
      { "[GET] groups": `http://${host}:${port}/api/v1/groups` },
      {
        "[GET] group_detail": `http://${host}:${port}/api/v1/groups/group/detail/{id}`,
      },
      {
        "[GET] count_groups_and_students_studying": `http://${host}:${port}/api/v1/groups/count-groups-and-count-students-studying`,
      },
      {
        "[POST] create_group": `http://${host}:${port}/api/v1/groups/create`,
      },
      {
        "[PATCH] edit_group": `http://${host}:${port}/api/v1/groups/edit/:id`,
      },
      {
        "[DELETE] detroy_group": `http://${host}:${port}/api/v1/groups/destroy/:id`,
      },
    ],
  });
});
rootRouter(app);
app.get("/*" || "/api/v1/*", (req, res) => {
  msg(res, "404 not found", undefined, undefined, false);
});

app.listen(port, () => {
  console.log(`Server is running http://${host}:${port}`);
});
