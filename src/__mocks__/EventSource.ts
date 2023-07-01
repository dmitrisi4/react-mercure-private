// EventSource mock
// https://html.spec.whatwg.org/multipage/server-sent-events.html#eventsource

export const sources: { [key: string]: MockEventSource } = {};

class MockEventSource {
  private url: string;
  private listeners: { [event: string]: Array<(event: MessageEvent) => void> };
  public readyState: number;

  constructor(url: string) {
    this.listeners = {};
    this.readyState = 1;
    this.url = url;

    sources[url] = this;
  }

  addEventListener(event: string, callback: (event: MessageEvent) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  removeEventListener(event: string, callback: (event: MessageEvent) => void) {
    if (this.listeners[event]) {
      const index = this.listeners[event].indexOf(callback);
      if (index !== -1) {
        this.listeners[event].splice(index, 1);
      }
    }
  }

  dispatchEvent(event: MessageEvent) {
    if (this.listeners[event.type]) {
      this.listeners[event.type].forEach((callback) => {
        callback(event);
      });
    }
  }

  close() {
    delete sources[this.url];
  }

  set onmessage(callback: (this: EventSource, ev: MessageEvent) => unknown) {
    this.addEventListener("message", callback);
  }

  // Simulate receiving an SSE event
  receiveEvent(eventName: string, eventData: unknown) {
    const event = new MessageEvent(eventName, { data: eventData });
    this.dispatchEvent(event);
  }
}

export default MockEventSource;
