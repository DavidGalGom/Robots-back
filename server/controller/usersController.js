const User = require("../../database/models/user");

const addUser = async (req, res) => {
  const users = await User.create({
    userName: "David",
    password: "1234abcd",
  });
  res.json(users);
};

module.exports = {
  addUser,
};
