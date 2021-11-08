const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/user");

const addUser = async (req, res) => {
  const users = await User.create({
    userName: "David",
    password: await bcrypt.hash("1234abcd", 10),
  });
  res.json(users);
};

const checkUser = async (req, res, next) => {
  const { userName, password } = req.body;
  try {
    const currentUser = await User.findOne({ userName });
    if (currentUser) {
      const currentPassword = await bcrypt.compare(
        password,
        currentUser.password
      );
      if (currentPassword) {
        const token = jwt.sign(
          {
            id: currentUser.id,
            userName: currentUser.userName,
          },
          process.env.USER_CHECK_TOKEN,
          {
            expiresIn: 86400,
          }
        );
        res.json(token);
      } else {
        const error = new Error("Authentication failed");
        error.code = 401;
        next(error);
      }
    } else {
      const error = new Error("Authentication failed");
      error.code = 401;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    error.message = "Authentication problem";
    next(error);
  }
};

module.exports = {
  addUser,
  checkUser,
};
