const express = require("express");
const { getRobots, getRobotById } = require("../controller/robotsController");

const router = express.Router();

router.get("/", getRobots);
router.get("/:idRobot", getRobotById);
module.exports = router;
