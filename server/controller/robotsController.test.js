const Robot = require("../../database/models/robot");
const { getRobots } = require("./robotsController");

describe("Given a Robot function", () => {
  describe("When it receives an object res", () => {
    test("Then it should summon the method json", async () => {
      const robots = [
        {
          id: 1,
          name: "BB8",
          image: "image.png",
          speed: 10,
          resistance: 10,
          creationDate: "05/11/2021",
        },
        {
          id: 2,
          name: "EVA-01",
          image: "image2.png",
          speed: 10,
          resistance: 10,
          creationDate: "05/11/2021",
        },
      ];
      Robot.find = jest.fn().mockResolvedValue(robots);
      const res = {
        json: jest.fn(),
      };

      await getRobots(null, res);

      expect(Robot.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(robots);
    });
  });
  describe("When it receives a getRobots function", () => {
    test("Then it should summon the Robot.find", async () => {
      Robot.find = jest.fn().mockResolvedValue({});

      const res = {
        json: () => {},
      };
      const next = () => {};

      await getRobots(null, res, next);

      expect(Robot.find).toHaveBeenCalled();
    });
  });
});
