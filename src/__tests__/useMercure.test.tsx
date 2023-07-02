import React from "react";
import { render, act } from "@testing-library/react";
import { useMercure } from "../useMercure";
import MockEventSource, { sources } from "../__mocks__/EventSource";

Object.defineProperty(window, "EventSource", {
  writable: true,
  value: MockEventSource
});

function TestComponent({ url, topics }: { url: string; topics: string[] }) {
  const { data, isConnected } = useMercure<string>(url, topics);

  return (
    <div>
      <span role="status">
        {isConnected ? "Connected to Mercure" : "Connecting..."}
      </span>
      <span role="alert" aria-live="assertive">
        {data ? `Data received: ${data}` : "No data"}
      </span>
    </div>
  );
}

describe("useMercure", () => {
  const url = "http://example.com/events";
  const testData = "Bonjour, Mercure !";

  it("should subscribe to one topic", () => {
    const { getByRole } = render(<TestComponent url={url} topics={["foo"]} />);

    const topics = Object.keys(sources)[0];
    expect(topics).toBe("http://example.com/events?topic=foo");

    expect(getByRole("status").innerHTML).toEqual("Connected to Mercure");
    expect(getByRole("alert").innerHTML).toEqual("No data");

    act(() => {
      sources[topics].receiveEvent("message", testData);
    });

    expect(getByRole("alert").innerHTML).toEqual(`Data received: ${testData}`);
  });

  it("should subscribe to multiple topics", () => {
    render(<TestComponent url={url} topics={["foo", "bar", "baz"]} />);

    const topics = Object.keys(sources)[0];
    expect(topics).toBe(
      "http://example.com/events?topic=foo&topic=bar&topic=baz"
    );
  });

  it("should close all subscriptions on unmount", () => {
    const { unmount } = render(
      <TestComponent url={url} topics={["foo", "bar", "baz"]} />
    );

    unmount();

    expect(Object.keys(sources).length).toBe(0);
  });
});
