const User = require("../../database/models/user");
const { checkUser } = require("./usersController");

jest.mock("../../database/models/user");

describe("Given a Robot function", () => {
  describe("When it receives a wrong username", () => {
    test("Then it should summon next function with an error", async () => {
      User.findOne = jest.fn().mockResolvedValue(null);
      const req = {
        body: {
          userName: "David",
          password: "1234abcd",
        },
      };
      const next = jest.fn();
      const expectedError = new Error("Authentication failed");
      expectedError.code = 401;

      await checkUser(req, null, next);

      expect(next.mock.calls[0][0]).toHaveProperty("message");
      expect(next.mock.calls[0][0]).toHaveProperty("code", 401);
    });
  });
});
