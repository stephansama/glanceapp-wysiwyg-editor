import { Link } from "@tanstack/react-router";

import * as React from "react";

import { actions } from "./actions";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const title = "Glance WYSIWYG Editor" as const;

export type CommonActionProps = {
  commonStyles: string;
  children: React.ReactElement;
};

export function Header() {
  return (
    <header className="p-4 z-10 h-16 flex items-center fixed w-full bg-gray-800 text-white shadow-lg">
      <h1 className="ml-4 gap-2 flex items-center justify-center text-xl font-semibold">
        <Link to="/">
          <img
            src="https://raw.githubusercontent.com/glanceapp/glance/6c5b7a3f4cc409e31739b2914bb6636d08299126/docs/logo.png"
            alt="Glance Logo"
            className="h-10 pointer-events-none"
          />
        </Link>
        <span className="pointer-events-none">{title}</span>
      </h1>
      <div className="ml-auto flex gap-2">
        {Object.entries(actions).map(([k, action]) => (
          <Tooltip key={k}>
            <TooltipTrigger asChild>
              {"Component" in action ? (
                <div>
                  <action.Component commonStyles="p-2 hover:bg-gray-700 cursor-pointer rounded-lg transition-colors">
                    <action.Icon />
                  </action.Component>
                </div>
              ) : "href" in action ? (
                <a
                  aria-label={action.description}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  href={action.href}
                  target="_blank"
                >
                  <action.Icon />
                </a>
              ) : null}
            </TooltipTrigger>
            <TooltipContent>{action.description}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </header>
  );
}
