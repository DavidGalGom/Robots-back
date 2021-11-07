const express = require("express");
const {
  getRobots,
  getRobotById,
  postRobot,
  deleteRobot,
} = require("../controller/robotsController");

const router = express.Router();

router.get("/", getRobots);
router.get("/:idRobot", getRobotById);
router.post("/create", postRobot);
router.delete("/delete/:idRobot", deleteRobot);
module.exports = router;
