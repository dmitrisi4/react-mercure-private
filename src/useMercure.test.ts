import { renderHook } from "@testing-library/react";
import { useMercure } from "./useMercure";

describe("useMercure hook", () => {
  it("test", () => {
    const render = renderHook(useMercure);

    console.log(render.result);
  });
});
