import type { CommonActionProps } from "./header";

import { cn } from "@/lib/utils";

export function Import({ children, commonStyles }: CommonActionProps) {
  return <div className={cn(commonStyles)}>{children}</div>;
}
