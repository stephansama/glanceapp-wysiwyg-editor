import {
  DownloadIcon,
  HelpCircleIcon,
  LucideSquareArrowOutUpRight,
  Moon,
  SettingsIcon,
  Sun,
} from "lucide-react";
import * as React from "react";

import { Export } from "./export";
import { Import } from "./import";
import { Settings } from "./settings";
import { ThemeToggle } from "./theme-toggle";

import type { CommonActionProps } from "./header";

export const actions = {
  theme: {
    description: "Toggle theme",
    Icon: ThemeIcon,
    Component: ThemeToggle,
  },
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

function ThemeIcon() {
  return (
    <div className="relative">
      <Sun className="dark:hidden" />
      <Moon className="hidden dark:block" />
    </div>
  );
}
