const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const authExist = req.headers.authorization;
  if (!authExist) {
    const error = new Error("Empty token");
    error.code = 401;
    next(error);
  } else {
    const token = authExist.split(" ")[1];
    try {
      const user = await jwt.verify(token, process.env.USER_CHECK_TOKEN);
      req.userName = user.userName;
      next();
    } catch (error) {
      error.message = "Wrong token";
      error.code = 401;
      next(error);
    }
  }
};

module.exports = auth;
