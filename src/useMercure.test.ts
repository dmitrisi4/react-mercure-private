import { renderHook } from "@testing-library/react";
import { useMercure } from "./useMercure";
import EventSourceMock, { sources } from "./__mocks__/EventSource";

// Mock window.EventSource
Object.defineProperty(window, "EventSource", {
  writable: true,
  value: EventSourceMock
});

const url = "example.com";
const messageEvent = new MessageEvent("foo", {
  data: "1"
});

afterEach(() => {
  delete sources[url];
});

describe("useMercure hook", () => {
  it("opens connection on mount", async () => {
    renderHook(() => useMercure(url));

    await sources[url].emitOpen();

    expect(sources[url].readyState).toBe(sources[url].OPEN);
  });

  it("closes connection on unmount", () => {
    const render = renderHook(() => useMercure(url));

    render.unmount();

    expect(sources[url].readyState).toBe(sources[url].CLOSED);
  });

  it("subscribes to 3 differents sources", () => {
    renderHook(() => useMercure("example1"));
    renderHook(() => useMercure("example2"));
    renderHook(() => useMercure("example3"));

    // TODO: expect 3 sources
  });
});
