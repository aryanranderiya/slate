"use client";
import { cn } from "@/lib/utils";
import { getIconForFolder } from "@/lib/folder-icons";
import type { Folder } from "@/types";
import { StickyNote02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Plus, Star, X } from "lucide-react";
import Link from "next/link";

interface FolderSidebarProps {
  folders: Folder[];
  activeFolder: string;
  setActiveFolder: (id: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onAddNote?: () => void;
}

export function FolderSidebar({
  folders,
  activeFolder,
  setActiveFolder,
  isOpen,
  setIsOpen,
  onAddNote,
}: FolderSidebarProps) {
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 bg-black/20 z-20 transition-opacity duration-200 md:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={cn(
          "min-w-64 w-fit bg-white border-r-2 border-zinc-200 h-screen flex flex-col transition-all duration-300 ease-in-out",
          "fixed md:static z-30 top-0 left-0",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <Link href={"/"}>
          <div className="p-4 border-b border-zinc-200 flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <HugeiconsIcon icon={StickyNote02Icon} height={30} width={30} />
                <h1 className="text-4xl font-semibold title-font">Slate</h1>
              </div>
              <div className="text-sm tracking-tight text-nowrap">
                Where colorful ideas find their home
              </div>
            </div>
            <button
              className="p-1 rounded-md hover:bg-zinc-100 md:hidden"
              onClick={() => setIsOpen(false)}
            >
              <X size={20} />
            </button>
          </div>
        </Link>

        <div className="flex-1 overflow-auto p-3">
          {onAddNote && (
            <button
              onClick={onAddNote}
              className="w-full flex items-center justify-center gap-2 mb-4 px-3 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-sm font-medium transition-colors"
            >
              <Plus size={18} />
              <span>New Note</span>
            </button>
          )}
          <div className="space-y-1">
            {folders.map((folder) => (
              <Link
                key={folder.id}
                href={folder.id === "all" ? "/" : `/folder/${folder.id}`}
                className="block"
              >
                <button
                  style={
                    {
                      backgroundColor:
                        activeFolder === folder.id ? `${folder.color}20` : "",
                      "--hover-bg-color": `${folder.color}15`,
                    } as React.CSSProperties
                  }
                  className={cn(
                    "w-full flex items-center px-3 py-2 rounded-xl text-sm transition-all gap-2 hover:bg-[var(--hover-bg-color)]"
                  )}
                  onClick={() => {
                    setActiveFolder(folder.id);
                    setIsOpen(false);
                  }}
                >
                  <span>
                    {folder.id === "starred" ? (
                      <Star className="w-5 h-5 text-black" />
                    ) : (
                      getIconForFolder(folder.name, "w-5 h-5 text-black")
                    )}
                  </span>
                  <span className="truncate tracking-tight">{folder.name}</span>
                </button>
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
