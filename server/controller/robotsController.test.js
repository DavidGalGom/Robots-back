const Robot = require("../../database/models/robot");
const {
  getRobots,
  getRobotById,
  postRobot,
  deleteRobot,
} = require("./robotsController");

jest.mock("../../database/models/robot");
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

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

describe("Given a getRobotById function", () => {
  describe("When it receives a request with an id 1, a res object and a next function", () => {
    test("Then it should summon Robot.findById with a 1", async () => {
      Robot.findById = jest.fn().mockResolvedValue({});
      const idRobot = 1;
      const req = {
        params: {
          idRobot,
        },
      };
      const res = {
        json: () => {},
      };
      const next = () => {};

      await getRobotById(req, res, next);

      expect(Robot.findById).toHaveBeenCalledWith(idRobot);
    });
  });

  describe("And Robot.findById rejects", () => {
    test("Then it should summon next function with the error rejected", async () => {
      const error = {};
      Robot.findById = jest.fn().mockRejectedValue(error);
      const req = {
        params: {
          idRobot: 1,
        },
      };
      const res = {};
      const next = jest.fn();

      await getRobotById(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
  describe("And Robot.findById resolves to BB8", () => {
    test("Then it should summon res.json with BB8", async () => {
      const id = 1;
      const BB8 = {
        id,
        name: "BB8",
        image: "image.png",
        speed: 10,
        resistance: 10,
        creationDate: "05/11/2021",
      };
      Robot.findById = jest.fn().mockResolvedValue(BB8);
      const req = {
        params: {
          id,
        },
      };
      const res = {
        json: jest.fn(),
      };

      await getRobotById(req, res);

      expect(res.json).toHaveBeenCalledWith(BB8);
    });
  });

  describe("When a id arrives and there isn't in the database", () => {
    test("Then it should arrive a 404 code", async () => {
      const error = new Error("Robot not found");
      Robot.findById = jest.fn().mockResolvedValue(null);
      const idRobot = 10;
      const req = {
        params: {
          idRobot,
        },
      };
      const res = {
        json: () => {},
      };
      const next = jest.fn();

      await getRobotById(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given the createRobot function", () => {
  describe("When it receives a resolve", () => {
    test("Then it should create the new robot", async () => {
      const req = {
        id: 2,
        name: "EVA-01",
        image: "image2.png",
        speed: 10,
        resistance: 10,
        creationDate: "05/11/2021",
      };
      const result = {
        id: 2,
        name: "EVA-01",
        image: "image2.png",
        speed: 10,
        resistance: 10,
        creationDate: "05/11/2021",
      };

      const res = mockResponse();

      Robot.create = jest.fn().mockResolvedValue(result);
      await postRobot(req, res, () => {});

      expect(res.json).toHaveBeenCalledWith(result);
    });
  });

  describe("When it receives a rejected promise", () => {
    test("Then it should summon the method next with a error", async () => {
      const req = {
        id: "1",
        name: "Robot",
        image: "robot.jpg",
        speed: 1,
        resistence: 1,
        creationDate: "unknown",
      };

      Robot.create = jest.fn().mockRejectedValue({});
      const next = jest.fn();

      const res = mockResponse();
      await postRobot(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given a deleteRobot function", () => {
  describe("When it receives a request with an id 1, a response and a next function", () => {
    test("Then it should call the Robot.findByIdAndDelete with a 1", async () => {
      const idRobot = 1;
      const req = {
        params: {
          idRobot,
        },
      };
      const res = {
        json: () => {},
      };
      const next = () => {};
      Robot.findByIdAndDelete = jest.fn().mockResolvedValue({});

      await deleteRobot(req, res, next);
      expect(Robot.findByIdAndDelete).toHaveBeenCalledWith(idRobot);
    });
  });

  describe("And Robot.findByIdAndDelete returns undefined", () => {
    test("Then it should call next with an error", async () => {
      const error = new Error("Robot not found");
      Robot.findByIdAndDelete = jest.fn().mockResolvedValue(null);
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {};
      const next = jest.fn();

      await deleteRobot(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("And Robot.findByIdAndDelete rejects", () => {
    test("Then it should call next with an error", async () => {
      const error = {};
      Robot.findByIdAndDelete = jest.fn().mockRejectedValue(error);
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {};
      const next = jest.fn();

      await deleteRobot(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(error).toHaveProperty("code");
      expect(error.code).toBe(400);
    });
  });
});
