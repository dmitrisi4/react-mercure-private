import { useState } from "react";
import { useEventSource } from "./useEventSource";

export function useMercure<T = unknown>(url: string | URL, topic: string[], token: string) {
  const [data, setData] = useState<T>();

  const mercureURL = new URL(url);
  topic.forEach((t) => {
    mercureURL.searchParams.append("topic", t);
  });

  const eventHandler = (data: T) => {
    setData(data);
  };

  const { isConnected } = useEventSource<T>(mercureURL.toString(), eventHandler, token);

  return { data, isConnected };
}
