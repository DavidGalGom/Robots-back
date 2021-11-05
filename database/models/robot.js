const { Schema, model } = require("mongoose");

const robotSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  speed: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  resistance: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  creationDate: {
    type: String,
    required: true,
  },
});

const Robot = model("Robot", robotSchema, "Robots");

module.exports = Robot;
