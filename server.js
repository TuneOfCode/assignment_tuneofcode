const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const { connection } = require("./api/init.model");
const rootRouter = require("./api/init.router");
const relationship = require("./api/relationship");
const port = process.env.PORT || 8888;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
connection();
relationship();
app.get("/", async (req, res) => {
  res.json({
    APIs: [
      { "[GET] users": `http://localhost:${port}/api/v1/users` },
      { "[GET] students": `http://localhost:${port}/api/v1/users/students` },
      {
        "[GET] student_detail": `http://localhost:${port}/api/v1/users/student/detail/{id}`,
      },
      { "[GET] leaders": `http://localhost:${port}/api/v1/users/leaders` },
      {
        "[GET] student registered": `http://localhost:${port}/api/v1/users/students/registered`,
      },
      { "[POST] create_user": `http://localhost:${port}/api/v1/users/create` },
      {
        "[POST] join_group": `http://localhost:${port}/api/v1/users/join-group`,
      },
      { "[PATCH] edit_user": `http://localhost:${port}/api/v1/users/edit/:id` },
      {
        "[DELETE] detroy_user": `http://localhost:${port}/api/v1/users/destroy/:id`,
      },
      { "[GET] groups": `http://localhost:${port}/api/v1/groups` },
      {
        "[GET] group_detail": `http://localhost:${port}/api/v1/groups/group/detail/{id}`,
      },
      {
        "[GET] count_groups_and_students_studying": `http://localhost:${port}/api/v1/groups/count-groups-and-count-students-studying`,
      },
      {
        "[POST] create_group": `http://localhost:${port}/api/v1/groups/create`,
      },
      {
        "[PATCH] edit_group": `http://localhost:${port}/api/v1/groups/edit/:id`,
      },
      {
        "[DELETE] detroy_group": `http://localhost:${port}/api/v1/groups/destroy/:id`,
      },
    ],
  });
});
rootRouter(app);

app.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
});
