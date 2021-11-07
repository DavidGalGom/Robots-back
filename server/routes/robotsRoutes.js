const express = require("express");
const {
  getRobots,
  getRobotById,
  postRobot,
} = require("../controller/robotsController");

const router = express.Router();

router.get("/", getRobots);
router.get("/:idRobot", getRobotById);
router.post("/create", postRobot);
module.exports = router;
