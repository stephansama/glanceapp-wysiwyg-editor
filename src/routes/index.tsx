import { createFileRoute } from "@tanstack/react-router";

import { Editor } from "@/components/editor";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <div className="min-h-screen flex flex-col h-full  bg-linear-to-b from-slate-900 via-slate-800 to-slate-900">
      <Editor />
    </div>
  );
}
