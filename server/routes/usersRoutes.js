const express = require("express");
const { addUser } = require("../controller/usersController");

const router = express.Router();

router.post("/", addUser);

module.exports = router;
