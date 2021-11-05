const chalk = require("chalk");
const debug = require("debug")("robots:server");
const express = require("express");
const morgan = require("morgan");
const { notFoundErrorHandler, generalErrorHandler } = require("./error");
const robotsRoutes = require("./routes/robotsRoutes");

const app = express();

const initializeServer = (port) => {
  const server = app.listen(port, () => {
    debug(chalk.yellow(`Listening at port number: ${port}`));
  });

  server.on("error", (error) => {
    debug(chalk.red("Error at initializ server"));
    if (error.code === "EADDRINUSE") {
      debug(chalk.red(`Port number ${port} is already in use`));
    }
  });
};

app.use(morgan("dev"));
app.use(express.json());
app.use("/robots", robotsRoutes);
app.use(notFoundErrorHandler);
app.use(generalErrorHandler);

module.exports = initializeServer;
