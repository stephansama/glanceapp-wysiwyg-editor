import * as React from "react";

export type CommonSwapyProps = { swapyKey: string };

export function Handle({
  children,
  ...props
}: React.HTMLProps<HTMLDivElement>) {
  return (
    <div {...props} data-swapy-handle>
      {children}
    </div>
  );
}

export function Item({
  children,
  swapyKey: key,
  ...props
}: React.HTMLProps<HTMLDivElement> & CommonSwapyProps) {
  return (
    <div {...props} data-swapy-item={key}>
      {children}
    </div>
  );
}

export function Slot({
  children,
  swapyKey: key,
  ...props
}: React.HTMLProps<HTMLDivElement> & CommonSwapyProps) {
  return (
    <div {...props} data-swapy-slot={key}>
      {children}
    </div>
  );
}
