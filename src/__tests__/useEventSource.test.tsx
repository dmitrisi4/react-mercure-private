import { renderHook } from "@testing-library/react";
import { useEventSource } from "../useEventSource";
import MockEventSource, { sources } from "../__mocks__/EventSource";

Object.defineProperty(window, "EventSource", {
  writable: true,
  value: MockEventSource
});

describe("useEventSource", () => {
  const url = "http://example.com/events";
  const eventHandler = jest.fn();

  it("should call the eventHandler with the received event data", () => {
    const testData = { message: "Hello, EventSource!" };

    renderHook(() => useEventSource(url, eventHandler));

    sources[url].receiveEvent("message", testData);

    expect(eventHandler).toHaveBeenCalledWith(testData);
  });

  it("should close the EventSource connection on unmount", () => {
    const { unmount } = renderHook(() => useEventSource(url, eventHandler));

    expect(sources[url].readyState).toBe(1);

    unmount();

    expect(sources[url]).toBeUndefined();
  });
});
