const debug = require("debug")("robots:database");

const chalk = require("chalk");
const mongoose = require("mongoose");

const connectDB = () =>
  new Promise((resolve, reject) => {
    mongoose.connect(process.env.MONGODB_STRING, (error) => {
      if (error) {
        debug(chalk.red("Initialization failed"));
        debug(chalk.red(error.message));
        reject();
        return;
      }
      debug(chalk.green("Connected to the data base"));
      resolve();
    });
  });

module.exports = connectDB;
