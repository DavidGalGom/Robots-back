const express = require("express");
const { checkUser } = require("../controller/usersController");

const router = express.Router();

router.post("/", checkUser);

module.exports = router;
