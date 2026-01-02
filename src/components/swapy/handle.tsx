import * as React from "react";

export function Handle({ children }: { children: React.ReactElement }) {
  return <div data-swapy-handle>{children}</div>;
}
