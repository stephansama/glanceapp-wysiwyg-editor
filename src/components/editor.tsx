"use client";

import { useClickAway } from "@uidotdev/usehooks";
import { X } from "lucide-react";
import { useQueryState } from "nuqs";
import * as React from "react";

import { Dropover } from "./dropover";

import { Page } from "@/components/page";
import { Container, Item, Slot, useContainer } from "@/components/swapy";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEditor } from "@/lib/state";

function CloseButton({ name }: { name: string }) {
  const { state, dispatch } = useEditor();
  const container = useContainer();

  React.useEffect(() => {
    container.swapy?.update();
  }, [state.pages]);

  return (
    <Button
      onClick={() => {
        dispatch({
          type: "REMOVE_PAGE",
          payload: { name },
        });
      }}
    >
      <X />
    </Button>
  );
}

function Content() {
  const { state, dispatch } = useEditor();
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
            dispatch({
              type: "ADD_PAGE",
              payload: {
                name: "name" + state.pages.length,
              },
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

export function Editor() {
  return (
    <EditorDropover>
      <Content />
    </EditorDropover>
  );
}

function EditorDropover({ children }: { children: React.ReactElement }) {
  const { state, dispatch } = useEditor();
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const clickAwayRef = useClickAway<HTMLDivElement>(() => {
    dispatch({ type: "SET_FILE_DROPOVER", payload: { state: false } });
  });

  React.useEffect(() => {
    containerRef.current?.addEventListener("dragover", () => {
      dispatch({ type: "SET_FILE_DROPOVER", payload: { state: true } });
    });
    containerRef.current?.addEventListener("dragleave", () => {
      dispatch({ type: "SET_FILE_DROPOVER", payload: { state: false } });
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
                dispatch({
                  type: "SET_FILE_DROPOVER",
                  payload: { state: false },
                });
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
