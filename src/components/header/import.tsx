import type { CommonActionProps } from "./header";

import { useFileImportDropover } from "@/lib/state";
import { cn } from "@/lib/utils";

export function Import({ children, commonStyles }: CommonActionProps) {
  const state = useFileImportDropover();
  return (
    <div
      onClick={() => state.setFileDropoverVisibilty(true)}
      className={cn(commonStyles)}
    >
      {children}
    </div>
  );
}
