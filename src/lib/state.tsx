"use client";

import { merge } from "es-toolkit/compat";
import * as React from "react";

import type { GlobalSchema, PageSchema } from "@/lib/schema";

export const EDITOR_LOCAL_STORAGEKEY = "state";

export type EditorActions =
  | { type: "CLEAR_ALL_PAGE"; payload: { id: number } }
  | { type: "SET_FILE_DROPOVER"; payload: { state: boolean } }
  | { type: "REMOVE_PAGE"; payload: { name: string } }
  | {
      type: "ADD_PAGE";
      payload: { name: string; columns?: PageSchema["columns"] };
    };

export type EditorState = GlobalSchema & {
  showFileImportDropover: boolean;
};

export const EditorContext = React.createContext<{
  state: EditorState;
  dispatch: React.ActionDispatch<[action: EditorActions]>;
} | null>(null);

const defaultState = {
  pages: [],
  showFileImportDropover: false,
} satisfies EditorState;

export function useEditor() {
  const context = React.useContext(EditorContext);
  if (!context) {
    throw new Error("useEditor must be called within an EditorProvider");
  }

  return context;
}

export function EditorProvider({
  children,
  initialState: initial,
}: {
  children: React.ReactElement | Array<React.ReactElement>;
  initialState: Partial<EditorState>;
}) {
  const initialState = merge(initial, defaultState);
  const [state, dispatch] = React.useReducer(reducer, initialState, () => {
    if (typeof window === "undefined") return initialState;
    const stored = window.localStorage.getItem(EDITOR_LOCAL_STORAGEKEY);
    return stored ? JSON.parse(stored) : initialState;
  });

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  return (
    <EditorContext.Provider value={{ state, dispatch }}>
      {children}
    </EditorContext.Provider>
  );
}

function reducer(state: EditorState, action: EditorActions): EditorState {
  switch (action.type) {
    case "SET_FILE_DROPOVER":
      return {
        ...state,
        showFileImportDropover: action.payload.state,
      };
    case "ADD_PAGE":
      return {
        ...state,
        pages: [
          ...state.pages,
          { name: action.payload.name, columns: action.payload.columns || [] },
        ],
      };
    case "CLEAR_ALL_PAGE":
      return { ...state, pages: [] };
    case "REMOVE_PAGE":
      return {
        ...state,
        pages: state.pages.filter((page) => page.name !== action.payload.name),
      };
    default:
      throw new Error("action not defined");
  }
}
