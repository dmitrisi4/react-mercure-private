import { useMercure } from "./useMercure";

describe("useMercure hook", () => {
  it("test", () => {
    expect(useMercure()).toEqual({ foo: "bar" });
  });
});
