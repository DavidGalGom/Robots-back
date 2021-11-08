const bcrypt = require("bcrypt");
const User = require("../../database/models/user");

const addUser = async (req, res) => {
  const users = await User.create({
    userName: "David",
    password: await bcrypt.hash("1234abcd", 10),
  });
  res.json(users);
};

module.exports = {
  addUser,
};
