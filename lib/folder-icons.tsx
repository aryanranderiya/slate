"use client";

import {
  AiIdeaIcon,
  AirplaneTakeOff01Icon,
  Archive02Icon,
  Folder02Icon,
  HealtcareIcon,
  MoneyBag02Icon,
  Mortarboard02Icon,
  StickyNote01Icon,
  WorkIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { FolderIcon } from "lucide-react";

export const getIconForFolder = (
  folderName: string,
  className?: string,
  color = undefined
) => {
  switch (folderName.toLowerCase()) {
    case "all":
      return (
        <HugeiconsIcon
          icon={StickyNote01Icon}
          className={className}
          color={color}
        />
      );
    case "work":
      return (
        <HugeiconsIcon icon={WorkIcon} className={className} color={color} />
      );
    case "personal":
      return (
        <HugeiconsIcon
          icon={HealtcareIcon}
          className={className}
          color={color}
        />
      );
    case "ideas":
      return (
        <HugeiconsIcon icon={AiIdeaIcon} className={className} color={color} />
      );
    case "projects":
      return (
        <HugeiconsIcon
          icon={Folder02Icon}
          className={className}
          color={color}
        />
      );
    case "education":
      return (
        <HugeiconsIcon
          icon={Mortarboard02Icon}
          className={className}
          color={color}
        />
      );
    case "finance":
      return (
        <HugeiconsIcon
          icon={MoneyBag02Icon}
          className={className}
          color={color}
        />
      );
    case "travel":
      return (
        <HugeiconsIcon
          icon={AirplaneTakeOff01Icon}
          className={className}
          color={color}
        />
      );
    case "archive":
      return (
        <HugeiconsIcon
          icon={Archive02Icon}
          className={className}
          color={color}
        />
      );
    default:
      return <FolderIcon className={className} color={color} />;
  }
};
