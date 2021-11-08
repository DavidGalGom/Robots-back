const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const [, token] = req.headers.authorization.split(" ");

  if (!token) {
    const error = new Error("Empty token");
    error.code = 401;
    next(error);
  } else {
    try {
      const user = await jwt.verify(token, process.env.USER_CHECK_TOKEN);
      req.userName = user.userName;
      next();
    } catch (error) {
      error.code = 401;
      error.message = "Not a correct token";
      next(error);
    }
  }
};

module.exports = auth;
