const express = require("express");
const { addUser, checkUser } = require("../controller/usersController");

const router = express.Router();

router.post("/", addUser);
router.get("/", checkUser);

module.exports = router;
