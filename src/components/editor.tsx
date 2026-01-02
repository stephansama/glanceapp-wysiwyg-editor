"use client";

import { useQueryState } from "nuqs";

import { Page } from "@/components/page";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EditorProvider, useEditor } from "@/lib/state";

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
        {state.pages.map((page) => (
          <TabsTrigger
            key={page.name}
            onClick={(_) => {
              setSelected(page.name);
            }}
            value={page.name}
          >
            {page.name}
          </TabsTrigger>
        ))}
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
    <EditorProvider initialState={{}}>
      <Content />
    </EditorProvider>
  );
}
