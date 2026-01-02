"use client";

import { useClickAway } from "@uidotdev/usehooks";
import { Redo, Undo, X } from "lucide-react";
import { useQueryState } from "nuqs";
import * as React from "react";

import { Dropover } from "./dropover";

import { Page } from "@/components/page";
import { Container, Item, Slot, useContainer } from "@/components/swapy";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEditorState, useFileImportDropover } from "@/lib/state";

function CloseButton({ name }: { name: string }) {
  const state = useEditorState();
  const container = useContainer();

  React.useEffect(() => {
    container.swapy?.update();
  }, [state.pages]);

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

  return (
    <Tabs
      value={selected || firstPageName}
      defaultValue={firstPageName}
      className="w-full"
    >
      <TabsList>
        <Container className="flex items-center gap-2">
          {state.pages.map((page) => (
            <Slot swapyKey={page.name} key={page.name}>
              <Item swapyKey={page.name}>
                <TabsTrigger
                  onClick={(_) => {
                    setSelected(page.name);
                  }}
                  value={page.name}
                >
                  {page.name}
                </TabsTrigger>
                <CloseButton name={page.name} />
              </Item>
            </Slot>
          ))}
        </Container>
        <Button
          onClick={() =>
            state.addPage({
              columns: [],
              name: `name${state.pages.length}`,
            })
          }
        >
          add
        </Button>
      </TabsList>
      {state.pages.map((page) => (
        <TabsContent key={page.name} value={page.name}>
          {page.name}
        </TabsContent>
      ))}
      <TabsContent value="name0">
        <Page />
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  );
}

function Toolbar() {
  const { undo, redo, pastStates, futureStates } =
    useEditorState.temporal.getState();

  const canUndo = pastStates.length > 0;
  const canRedo = futureStates.length > 0;

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
