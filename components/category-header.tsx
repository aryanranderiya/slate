"use client";

import { Button } from "@/components/ui/button";
import type { Folder } from "@/types";
import { Menu } from "lucide-react";
import { getIconForFolder } from "./folder-sidebar";

interface CategoryHeaderProps {
  folders: Folder[];
  activeFolderId: string;
  toggleSidebar?: () => void;
}

export function CategoryHeader({
  folders,
  activeFolderId,
  toggleSidebar,
}: CategoryHeaderProps) {
  const activeFolder = folders.find((folder) => folder.id === activeFolderId);

  if (!activeFolder) return null;
  return (
    <div className="flex items-center relative z-[1] justify-between ">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="md:hidden mr-1"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>
        {getIconForFolder(activeFolder.name, "w-7 h-7")}
        <h1 className="text-4xl title-font tracking-tighter">
          {activeFolder.name}
        </h1>
      </div>
    </div>
  );
}
