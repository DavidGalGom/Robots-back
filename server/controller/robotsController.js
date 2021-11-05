const Robot = require("../../database/models/robot");

const getRobots = async (req, res) => {
  const pets = await Robot.find();
  res.json(pets);
};

module.exports = {
  getRobots,
};
