"use client";

import { Page } from "@/components/page";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EditorProvider, useEditor } from "@/lib/state";

function Content() {
  const { state, dispatch } = useEditor();
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList>
        {state.pages.map((page) => (
          <TabsTrigger value={page.name}>{page.name}</TabsTrigger>
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
