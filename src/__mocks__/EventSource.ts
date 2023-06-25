// EventSource mock
// https://html.spec.whatwg.org/multipage/server-sent-events.html#eventsource

export const sources: { [key: string]: EventSourceMock } = {};

class EventSourceMock implements EventSource {
  readonly CONNECTING = 0;
  readonly OPEN = 1;
  readonly CLOSED = 2;

  onerror: ((this: EventSource, ev: Event) => void) | null;
  onmessage: ((this: EventSource, ev: MessageEvent<any>) => void) | null;
  onopen: ((this: EventSource, ev: Event) => void) | null;

  readyState: number;
  url: string;
  withCredentials: boolean;

  constructor(url: string | URL, eventSourceInitDict?: EventSourceInit) {
    this.readyState = this.CONNECTING;
    this.url = url.toString();
    this.withCredentials = eventSourceInitDict?.withCredentials || false;

    // Spy all sources subscribed to EventSourceMock
    sources[url.toString()] = this;
  }

  close(): void {
    this.readyState = this.CLOSED;
  }

  addEventListener<K extends keyof EventSourceEventMap>(
    type: K,
    listener: (this: EventSource, ev: EventSourceEventMap[K]) => any
  ): void {
    throw new Error("Method not implemented.");
  }

  removeEventListener<K extends keyof EventSourceEventMap>(
    type: K,
    listener: (this: EventSource, ev: EventSourceEventMap[K]) => any
  ): void {
    throw new Error("Method not implemented.");
  }

  dispatchEvent(event: Event): boolean {
    throw new Error("Method not implemented.");
  }

  // Simulates connection tentative
  emitOpen() {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        this.readyState = this.OPEN;
        resolve();
      }, 50);
    });
  }
}

export default EventSourceMock;
