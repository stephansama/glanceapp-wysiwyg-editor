import * as React from "react";

export function Handle({
  children,
  ...props
}: {
  children: React.ReactElement;
  className?: string;
}) {
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
}: {
  children: React.ReactElement;
  className?: string;
  swapyKey: string;
}) {
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
}: {
  children: React.ReactElement;
  className?: string;
  swapyKey: string;
}) {
  return (
    <div {...props} data-swapy-slot={key}>
      {children}
    </div>
  );
}
