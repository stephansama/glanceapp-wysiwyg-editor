import { Link } from "@tanstack/react-router";

import {
  DownloadIcon,
  HelpCircleIcon,
  LucideSquareArrowOutUpRight,
  SettingsIcon,
} from "lucide-react";
import * as React from "react";

import { Export } from "./export";
import { Import } from "./import";
import { Settings } from "./settings";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const title = "Glance WYSIWYG Editor";

export type CommonActionProps = {
  commonStyles: string;
  children: React.ReactElement;
};

const actions = {
  help: {
    description: "open up glance documentation",
    href: "https://github.com/glanceapp/glance/blob/6c5b7a3f4cc409e31739b2914bb6636d08299126/docs/configuration.md#configuring-glance",
    Icon: () => <HelpCircleIcon />,
  },
  import: {
    description: "import previous dashboard",
    Icon: () => <DownloadIcon />,
    Component: Import,
  },
  export: {
    description: "export current dashboard",
    Icon: () => <LucideSquareArrowOutUpRight />,
    Component: Export,
  },
  settings: {
    description: "settings for glance WYSIWIG",
    Icon: () => <SettingsIcon />,
    Component: Settings,
  },
} satisfies Record<
  string,
  Partial<{
    description: string;
    href?: string;
    Icon?: () => React.ReactElement;
    Component: (props: CommonActionProps) => React.ReactElement;
  }>
>;

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
                  <action.Component commonStyles="p-2 hover:bg-gray-700 rounded-lg transition-colors">
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
