const GroupController = require("./group.controller");
const { validateGroupName } = require("./group.middleware");

const router = require("express").Router();

router.get("/", GroupController.getListGroup);
router.get("/group/detail/:id", GroupController.getDetailGroup);
router.get(
  "/count-groups-and-count-students-studying",
  GroupController.studying
);
router.post("/create", [validateGroupName], GroupController.create);
router.patch("/edit/:id", GroupController.update);
router.delete("/destroy/:id", GroupController.destroy);
module.exports = router;
