import { Link } from "@tanstack/react-router";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DownloadIcon,
  HelpCircleIcon,
  LucideSquareArrowOutUpRight,
  Menu,
  SettingsIcon,
} from "lucide-react";
import * as React from "react";

const title = "Glance WYSIWIG Editor";

const actions = {
  help: {
    description: "open up glance documentation",
    onClick: () => {},
    Icon: HelpCircleIcon,
  },
  import: {
    description: "import previous dashboard",
    onClick: () => {},
    Icon: DownloadIcon,
  },
  export: {
    description: "export current dashboard",
    onClick: () => {},
    Icon: LucideSquareArrowOutUpRight,
  },
  settings: {
    description: "settings for glance WYSIWIG",
    Icon: SettingsIcon,
    onClick: () => {},
  },
} satisfies Record<
  string,
  Partial<{
    description: string;
    onClick: () => void;
    Icon: Omit<React.ForwardedRef<React.ReactElement>, "ref">;
  }>
>;

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [groupedExpanded, setGroupedExpanded] = React.useState<
    Record<string, boolean>
  >({});

  return (
    <>
      <header className="p-4 z-10 h-16 flex items-center fixed w-full bg-gray-800 text-white shadow-lg">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
        <h1 className="ml-4 gap-2 flex items-center justify-center text-xl font-semibold">
          <Link to="/">
            <img
              src="https://raw.githubusercontent.com/glanceapp/glance/6c5b7a3f4cc409e31739b2914bb6636d08299126/docs/logo.png"
              alt="Glance Logo"
              className="h-10"
            />
          </Link>
          <span className="pointer-events-none">{title}</span>
        </h1>
        <div className="ml-auto ">
          {Object.entries(actions).map(([k, action]) => (
            <Tooltip key={k}>
              <TooltipTrigger asChild>
                <button
                  aria-label={action.description}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  onClick={action.onClick}
                >
                  <action.Icon />
                </button>
              </TooltipTrigger>
              <TooltipContent>{action.description}</TooltipContent>
            </Tooltip>
          ))}
        </div>
      </header>
    </>
  );
}
