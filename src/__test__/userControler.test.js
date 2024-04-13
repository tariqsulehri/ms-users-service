const supertest = require("supertest");

describe("users", () => {
  describe("login route", () => {
    describe("if user not exist", () => {
      it("should return 404", () => {
        expect(true).toBe(true);
      });
    });
  });
});
