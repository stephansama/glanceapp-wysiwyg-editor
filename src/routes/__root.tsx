import { TanStackDevtools } from "@tanstack/react-devtools";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { NuqsAdapter } from "nuqs/adapters/tanstack-router";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import appDarkmode from "@/darkmode.js?url";
import { EditorProvider } from "@/lib/state";
import appCss from "@/styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    scripts: [{ src: appDarkmode }],
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      { title: "TanStack Start Starter" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootDocument,
  component: () => (
    <>
      <NuqsAdapter>
        <EditorProvider initialState={{}}>
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </EditorProvider>
      </NuqsAdapter>
    </>
  ),
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <TanStackDevtools
          config={{ position: "bottom-right" }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
