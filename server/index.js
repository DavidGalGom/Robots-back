const chalk = require("chalk");
const cors = require("cors");
const debug = require("debug")("robots:server");
const express = require("express");
const morgan = require("morgan");
const { validate } = require("express-validation");
const auth = require("./middleware/auth");
const { notFoundErrorHandler, generalErrorHandler } = require("./error");
const robotsRoutes = require("./routes/robotsRoutes");
const usersRoutes = require("./routes/usersRoutes");
const userValidation = require("./schemas/userSchema");

const app = express();

const initializeServer = (port) => {
  const server = app.listen(port, () => {
    debug(chalk.yellow(`Listening at port number: ${port}`));
  });

  server.on("error", (error) => {
    debug(chalk.red("Error at initialize server"));
    if (error.code === "EADDRINUSE") {
      debug(chalk.red(`Port number ${port} is already in use`));
    }
  });
};

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/users", validate(userValidation, {}, {}), usersRoutes);
app.use("/robots", auth, robotsRoutes);
app.use(notFoundErrorHandler);
app.use(generalErrorHandler);

module.exports = initializeServer;
