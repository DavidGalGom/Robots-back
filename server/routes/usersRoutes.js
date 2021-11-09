const express = require("express");
const { checkUser } = require("../controller/usersController");

const router = express.Router();

router.get("/", checkUser);

module.exports = router;
