"use client";

import { temporal } from "zundo";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { GlobalSchema, PageSchema } from "@/lib/schema";

export const EDITOR_LOCAL_STORAGE_KEY = "state";

export type EditorState = GlobalSchema;

export type EditorStateFunctions = {
  removePage: (name: string) => void;
  addPage: (props: PageSchema) => void;
};

export const useEditorState = create<EditorState & EditorStateFunctions>()(
  persist(
    temporal((set) => ({
      ...set,
      pages: [],
      showFileImportDropover: false,
      addPage(page) {
        set((state) => ({ pages: [...state.pages, page] }));
      },
      removePage(name) {
        set((state) => ({
          pages: state.pages.filter((page) => page.name !== name),
        }));
      },
    })),
    {
      name: EDITOR_LOCAL_STORAGE_KEY,
    },
  ),
);

export type FileImportState = { showFileImportDropover: boolean };

export type FileImportFunctions = {
  setFileDropoverVisibilty: (visible: boolean) => void;
};

export const useFileImportDropover = create<
  FileImportState & FileImportFunctions
>()((set) => ({
  showFileImportDropover: false,
  setFileDropoverVisibilty(visible) {
    set(() => ({
      showFileImportDropover: visible,
    }));
  },
}));
