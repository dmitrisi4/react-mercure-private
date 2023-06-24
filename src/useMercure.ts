import { useEffect, useState } from "react";

export function useMercure() {
  const [state] = useState("to be implemented");

  useEffect(() => {
    console.log("mount");
  }, []);

  // To Be Implemented
  return { state };
}
