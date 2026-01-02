"use client";

import * as React from "react";
import type { Swapy } from "swapy";
import { createSwapy } from "swapy";

import { cn } from "@/lib/utils";

export function Editor() {
  const swapyRef = React.useRef<Swapy | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (containerRef.current) {
      swapyRef.current = createSwapy(containerRef.current, {
        // animation: 'dynamic'
        // swapMode: 'drop',
        // autoScrollOnDrag: true,
        // enabled: true,
        // dragAxis: 'x',
        // dragOnHold: true
      });

      // swapyRef.current.enable(false)
      // swapyRef.current.destroy()
      // console.log(swapyRef.current.slotItemMap())

      swapyRef.current.onBeforeSwap((event) => {
        console.log("beforeSwap", event);
        return true;
      });

      swapyRef.current.onSwapStart((event) => {
        console.log("start", event);
      });
      swapyRef.current.onSwap((event) => {
        console.log("swap", event);
      });
      swapyRef.current.onSwapEnd((event) => {
        console.log("end", event);
      });
    }
    return () => {
      swapyRef.current?.destroy();
    };
  }, []);

  return (
    <div
      className={cn("w-full max-w-200 grid grid-cols-12 gap-2 mx-auto")}
      ref={containerRef}
    >
      <div className="col-span-3" data-swapy-slot="a">
        <div
          className="rounded-md flex flex-col items-center justify-center size-full bg-green-700"
          data-swapy-item="a"
        >
          <div>A</div>
        </div>
      </div>
      <div className="col-span-6">
        <div className="flex-1 h-full" data-swapy-slot="b">
          <div
            className="rounded-md flex flex-col has-[data-swapy-highlighted]:bg-white items-center justify-center size-full bg-green-700 relative"
            data-swapy-item="b"
          >
            <div data-swapy-handle>
              <img
                className="cursor-grab size-6 opacity-50 absolute top-4 left-4"
                src="https://api.iconify.design/formkit:draghandle.svg"
                alt=""
              />
            </div>
            <div>B</div>
          </div>
        </div>
      </div>
      <div className="col-span-3" data-swapy-slot="d">
        <div
          className="rounded-md h-40 flex flex-col items-center justify-center size-full bg-green-700"
          data-swapy-item="d"
        >
          <div>D</div>
        </div>
      </div>
    </div>
  );
}
