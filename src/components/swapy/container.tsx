import * as React from "react";
import type { Swapy } from "swapy";

import { createSwapy } from "swapy";

export default function container() {
  const swapyRef = React.useRef<Swapy | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!containerRef.current) return;

    swapyRef.current = createSwapy(containerRef.current);
  }, []);
  return (
    <div className="" ref={containerRef}>
      container
    </div>
  );
}
