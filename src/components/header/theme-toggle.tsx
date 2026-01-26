import type { CommonActionProps } from "./header";

import { cn } from "@/lib/utils";

export function ThemeToggle({ children, commonStyles }: CommonActionProps) {
  return (
    <div
      className={cn(commonStyles, "")}
      onClick={() => {
        document.documentElement.classList.toggle("dark");
      }}
    >
      {children}
    </div>
  );
}
