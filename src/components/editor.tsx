"use client";

import { X } from "lucide-react";
import { useQueryState } from "nuqs";
import * as React from "react";

import { Page } from "@/components/page";
import { Container, Item, Slot, useContainer } from "@/components/swapy";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEditor } from "@/lib/state";

function CloseButton({ name }: { name: string }) {
  const { state, dispatch } = useEditor();
  const container = useContainer();
  React.useEffect(() => {
    console.log(container.swapy);
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
  return <Content />;
}
