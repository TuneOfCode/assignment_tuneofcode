const UserController = require("./user.controller");

const router = require("express").Router();

router.get("/", UserController.getAll);
router.get("/students", UserController.getListStudent);
router.get("/leaders", UserController.getListLeader);
router.get("/student/detail/:id", UserController.getDetailStudent);
router.get("/students/registered", UserController.registered);
router.post("/join-group", UserController.joinGroup);
router.post("/create", UserController.create);
router.patch("/edit/:id", UserController.update);
router.delete("/destroy/:id", UserController.destroy);

module.exports = router;
