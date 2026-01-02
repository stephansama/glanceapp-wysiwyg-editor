import * as React from "react";
import type { Config, Swapy } from "swapy";
import { createSwapy } from "swapy";

const containerContext = React.createContext<{
  swapy: Swapy | null;
} | null>(null);

export function useContainer() {
  const context = React.useContext(containerContext);
  if (!context) {
    throw new Error("must use container within a container context");
  }

  return context;
}

export function Container({
  children,
  config = {},
  onBeforeSwap,
  onSwap,
  onSwapEnd,
  onSwapStart,
  ...props
}: {
  children: React.ReactElement | Array<React.ReactElement>;
  className?: string;
  config?: Partial<Config>;
  onBeforeSwap?: () => boolean;
  onSwap?: () => void;
  onSwapEnd?: () => void;
  onSwapStart?: () => void;
}) {
  const swapyRef = React.useRef<Swapy | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!containerRef.current) return;

    swapyRef.current = createSwapy(containerRef.current, config);

    if (onBeforeSwap) swapyRef.current.onBeforeSwap(onBeforeSwap);
    if (onSwap) swapyRef.current.onSwap(onSwap);
    if (onSwapEnd) swapyRef.current.onSwapEnd(onSwapEnd);
    if (onSwapStart) swapyRef.current.onSwapStart(onSwapStart);

    return () => {
      swapyRef.current?.destroy();
    };
  }, []);

  return (
    <containerContext.Provider value={{ swapy: swapyRef.current }}>
      <div {...props} ref={containerRef}>
        {children}
      </div>
    </containerContext.Provider>
  );
}
