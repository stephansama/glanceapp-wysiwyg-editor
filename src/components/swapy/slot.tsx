import React from "react";
import { utils } from "swapy";
import { useContainer } from "./container";

import type { SlotItemMapArray } from "swapy";

export type SlotProps<T> = {
  slotId: string;
  itemId: string;
  item: T | null;
};

export function ManagedSlot<T extends object>({
  children,
  items,
  idField,
  updateItems,
  ...props
}: React.HTMLProps<HTMLDivElement> & {
  children: (props: SlotProps<T>) => React.JSX.Element;
  items: Array<T>;
  idField: keyof T;
  updateItems: (props: Array<T>) => void;
}) {
  const container = useContainer();

  const [registeredSwap, setRegisteredSwap] = React.useState(false);

  const [slotItemMap, setSlotItemMap] = React.useState<SlotItemMapArray>(
    utils.initSlotItemMap(items, idField),
  );

  const slottedItems = React.useMemo(
    () => utils.toSlottedItems(items, idField, slotItemMap),
    [items, slotItemMap],
  );

  React.useEffect(() => {
    utils.dynamicSwapy(
      container.swapy,
      items,
      idField,
      slotItemMap,
      setSlotItemMap,
    );
  }, [items]);

  React.useEffect(() => {
    if (!container.swapy) return;
    if (!registeredSwap) {
      container.swapy.onSwap((event) => {
        setSlotItemMap(event.newSlotItemMap.asArray);
      });
    } else {
      setRegisteredSwap(true);
    }
  }, [container, registeredSwap]);

  React.useEffect(() => {
    const itemKeys = items.map((item) => item[idField]);
    const slotKeys = slottedItems.map((slot) => slot.itemId);

    if (slotKeys.length !== itemKeys.length) return;

    if (JSON.stringify(slotKeys) !== JSON.stringify(itemKeys)) {
      console.log({ slottedItems, items, slotItemMap });
      updateItems(
        slottedItems.map((item) => item.item).filter((x): x is T => Boolean(x)),
      );
    }
  }, [slottedItems]);

  return <div {...props}>{slottedItems.map(children)}</div>;
}
