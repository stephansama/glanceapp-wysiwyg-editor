import type { PageSchema } from "@/lib/schema";

import { AddColumn } from "@/components/add-column";
import { AddWidget } from "@/components/add-widget";
import { Container, Item, ManagedSlot, Slot } from "@/components/swapy";
import { Widget } from "@/components/widget";
import { useEditorState } from "@/lib/state";
import { cn } from "@/lib/utils";

export function Page(props: PageSchema) {
  const state = useEditorState();

  return (
    <div className="grid gap-8 grid-cols-12">
      {props.columns.map((column, index) => (
        <div
          key={props.name + column.size}
          className={cn({
            "col-span-3": column.size === "small",
            "col-span-6": column.size === "full",
          })}
        >
          {column.widgets && (
            <Container config={{ manualSwap: true }}>
              <ManagedSlot
                items={column.widgets}
                idField="type"
                updateItems={(curr) => {
                  //
                }}
              >
                {/* @ts-expect-error is right */}
                {({ slotId, item, itemId }) => (
                  <Slot
                    swapyKey={slotId}
                    className={cn("grid swapy-highlighted:bg-amber-200")}
                  >
                    {item && (
                      <Item
                        swapyKey={itemId}
                        className="h-40 w-full flex rounded-md items-center justify-center bg-red-400"
                      >
                        <Widget {...item} />
                      </Item>
                    )}
                  </Slot>
                )}
              </ManagedSlot>
            </Container>
          )}
          <AddWidget columnIndex={index} pageName={props.name} />
        </div>
      ))}
      <AddColumn name={props.name} disabled={props.columns.length > 2} />
    </div>
  );
}
