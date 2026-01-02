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

  return containerContext;
}

export function Container({
  children,
  onBeforeSwap,
  onSwap,
  onSwapStart,
  onSwapEnd,
  config,
  ...props
}: {
  children: React.ReactElement;
  config?: Partial<Config>;
  onBeforeSwap?: () => boolean;
  onSwapStart?: () => void;
  onSwap?: () => void;
  onSwapEnd?: () => void;
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

  const value = React.useMemo(
    () => ({
      swapy: swapyRef.current,
    }),
    [],
  );

  return (
    <containerContext.Provider value={value}>
      <div {...props} ref={containerRef}>
        {children}
      </div>
    </containerContext.Provider>
  );
}
