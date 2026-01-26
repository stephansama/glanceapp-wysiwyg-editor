"use client";

import { temporal } from "zundo";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import type {
  ColumnsSchema,
  GlobalSchema,
  PageSchema,
  WidgetsSchema,
} from "@/lib/schema";

export const EDITOR_LOCAL_STORAGE_KEY = "state";

export type EditorState = GlobalSchema;

export type EditorStateFunctions = {
  addColumn: (name: string, column: ColumnsSchema) => void;
  addWidget: (name: string, columnId: number, widget: WidgetsSchema) => void;
  removePage: (name: string) => void;
  addPage: (props: PageSchema) => void;
  updatePages: (props: Array<PageSchema>) => void;
};

export const useEditorState = create<EditorState & EditorStateFunctions>()(
  persist(
    temporal((set) => ({
      pages: [],
      showFileImportDropover: false,
      addColumn(name, column) {
        set((state) => ({
          pages: state.pages.map((page) => {
            if (page.name !== name) return page;

            if (page.columns.length >= 3) return page;

            page.columns.push(column);

            return page;
          }),
        }));
      },
      addWidget(name, columnId, widget) {
        set((state) => ({
          pages: state.pages.map((page) => {
            if (page.name !== name) return page;

            page.columns.map((column, i) => {
              if (columnId !== i) return column;

              column.widgets = [];
              column.widgets.push(widget);

              return widget;
            });

            return page;
          }),
        }));
      },
      updatePages(pages) {
        set(() => ({ pages }));
      },
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
