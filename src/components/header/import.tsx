import type { CommonActionProps } from "./header";

import { useEditor } from "@/lib/state";
import { cn } from "@/lib/utils";

export function Import({ children, commonStyles }: CommonActionProps) {
  const { state, dispatch } = useEditor();
  return (
    <div
      onClick={() => {
        dispatch({
          type: "SET_FILE_DROPOVER",
          payload: { state: !state.showFileImportDropover },
        });
      }}
      className={cn(commonStyles)}
    >
      {children}
    </div>
  );
}
