"use client";

import { useClickAway } from "@uidotdev/usehooks";
import { Redo, Undo, X } from "lucide-react";
import { useQueryState } from "nuqs";
import * as React from "react";

import { AddPageForm } from "./add-page";
import { Dropover } from "./dropover";
import { Page } from "./page";

import {
  Container,
  Item,
  ManagedSlot,
  Slot,
  useContainer,
} from "@/components/swapy";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEditorState, useFileImportDropover } from "@/lib/state";

function CloseButton({ name }: { name: string }) {
  const state = useEditorState();
  const container = useContainer();

  React.useEffect(() => {
    container.swapy?.update();
  }, [state.pages, container.swapy]);

  return (
    <Button
      onClick={() => {
        state.removePage(name);
      }}
    >
      <X />
    </Button>
  );
}

function Content() {
  const state = useEditorState();
  const firstPageName = state.pages.at(0)?.name;
  const [selected, setSelected] = useQueryState("page");
  const initialValue = selected || firstPageName;

  React.useEffect(() => {
    console.log(state.pages);
  }, [state.pages]);

  return (
    <Tabs value={initialValue} defaultValue={initialValue} className="w-full">
      <TabsList>
        <Container
          className="flex items-center gap-2"
          config={{ manualSwap: true, dragAxis: "x" }}
        >
          <ManagedSlot
            className="flex items-center"
            items={state.pages}
            idField="name"
            updateItems={(items) => {
              state.updatePages(items);
            }}
          >
            {/* @ts-expect-error is right */}
            {({ slotId, item, itemId }) => (
              <Slot swapyKey={slotId} key={slotId}>
                {item && (
                  <Item swapyKey={itemId}>
                    <TabsTrigger
                      onClick={(_) => {
                        setSelected(item.name);
                      }}
                      value={item.name}
                    >
                      {item.name}
                    </TabsTrigger>
                    <CloseButton name={item.name} />
                  </Item>
                )}
              </Slot>
            )}
          </ManagedSlot>
        </Container>
        <AddPageForm />
      </TabsList>
      {state.pages.map((page) => (
        <TabsContent key={page.name} value={page.name}>
          <Page {...page} />
        </TabsContent>
      ))}
    </Tabs>
  );
}

function Toolbar() {
  const { undo, redo, pastStates, futureStates } =
    useEditorState.temporal.getState();

  const canUndo = !!pastStates.length;
  const canRedo = !!futureStates.length;

  return (
    <div className="my-2">
      <Button onClick={() => undo()} disabled={canUndo}>
        <Undo />
      </Button>
      <Button onClick={() => redo()} disabled={canRedo}>
        <Redo />
      </Button>
    </div>
  );
}

export function Editor() {
  return (
    <EditorDropover>
      <Toolbar />
      <Content />
    </EditorDropover>
  );
}

function EditorDropover({
  children,
}: {
  children: React.ReactElement | Array<React.ReactElement>;
}) {
  const state = useFileImportDropover();
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const clickAwayRef = useClickAway<HTMLDivElement>(() => {
    state.setFileDropoverVisibilty(false);
  });

  React.useEffect(() => {
    containerRef.current?.addEventListener("dragover", () => {
      state.setFileDropoverVisibilty(true);
    });
    containerRef.current?.addEventListener("dragleave", () => {
      state.setFileDropoverVisibilty(false);
    });
  }, []);

  return (
    <div className="relative h-full" ref={containerRef}>
      {children}
      {state.showFileImportDropover && (
        <div className="fixed inset-0 justify-center items-center flex">
          <div ref={clickAwayRef}>
            <Dropover
              onDrop={() => {
                state.setFileDropoverVisibilty(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
