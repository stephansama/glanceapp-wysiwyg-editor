import * as React from "react";

type Children = React.ReactElement | Array<React.ReactElement>;

export function Handle({
  children,
  ...props
}: {
  children: Children;
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
  children: Children;
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
  children: Children;
  className?: string;
  swapyKey: string;
}) {
  return (
    <div {...props} data-swapy-slot={key}>
      {children}
    </div>
  );
}
