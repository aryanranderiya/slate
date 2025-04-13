"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getIconForFolder } from "@/lib/folder-icons";
import { Folder } from "@/types";
import {
  CalendarDays,
  CheckIcon,
  Clock,
  Filter,
  FolderIcon,
  SortAsc,
  SortDesc,
  Star,
  StarIcon,
} from "lucide-react";
import { Badge } from "./ui/badge";

type SortOption = "updatedAt" | "createdAt" | "title" | "starred";
type SortDirection = "asc" | "desc";

interface SearchFiltersProps {
  folders: Folder[];
  selectedFolders: string[];
  onFolderSelect: (folderId: string) => void;
  sortBy: SortOption;
  onSortChange: (option: SortOption) => void;
  sortDirection: SortDirection;
  onSortDirectionChange: (direction: SortDirection) => void;
  starredOnly: boolean;
  onStarredChange: (value: boolean) => void;
}

export function SearchFilters({
  folders,
  selectedFolders,
  onFolderSelect,
  sortBy,
  onSortChange,
  sortDirection,
  onSortDirectionChange,
  starredOnly,
  onStarredChange,
}: SearchFiltersProps) {
  const sortOptions = [
    {
      value: "updatedAt",
      label: "Last Updated",
      icon: <Clock className="h-4 w-4" />,
    },
    {
      value: "createdAt",
      label: "Date Created",
      icon: <CalendarDays className="h-4 w-4" />,
    },
    { value: "title", label: "Title", icon: <SortAsc className="h-4 w-4" /> },
    { value: "starred", label: "Starred", icon: <Star className="h-4 w-4" /> },
  ];

  const activeFilters = selectedFolders.length > 0 || starredOnly;

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            className={`rounded-full ${
              activeFilters
                ? "bg-primary/10 text-primary border-primary/30"
                : ""
            }`}
          >
            <Filter className="h-5 w-5" />
            {activeFilters && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                {selectedFolders.length + (starredOnly ? 1 : 0)}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Filter Notes</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => onStarredChange(!starredOnly)}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <StarIcon className="h-4 w-4 text-yellow-400" />
                <span>Starred only</span>
              </div>
              {starredOnly && <CheckIcon className="h-4 w-4" />}
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <FolderIcon className="h-4 w-4 mr-2" />
              <span>Categories</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="w-56">
                {folders.map((folder) => (
                  <DropdownMenuItem
                    key={folder.id}
                    onClick={() => onFolderSelect(folder.id)}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      {getIconForFolder(folder.name, "h-4 w-4")}
                      <span>{folder.name}</span>
                    </div>
                    {selectedFolders.includes(folder.id) && (
                      <CheckIcon className="h-4 w-4" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" className="rounded-full">
            {sortDirection === "asc" ? (
              <SortAsc className="h-5 w-5" />
            ) : (
              <SortDesc className="h-5 w-5" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Sort Notes</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuRadioGroup
            value={sortBy}
            onValueChange={(value) => onSortChange(value as SortOption)}
          >
            {sortOptions.map((option) => (
              <DropdownMenuRadioItem key={option.value} value={option.value}>
                <div className="flex items-center gap-2">
                  {option.icon}
                  <span>{option.label}</span>
                </div>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>

          <DropdownMenuSeparator />

          <DropdownMenuRadioGroup
            value={sortDirection}
            onValueChange={(value) =>
              onSortDirectionChange(value as SortDirection)
            }
          >
            <DropdownMenuRadioItem value="asc">
              <div className="flex items-center gap-2">
                <SortAsc className="h-4 w-4" />
                <span>Ascending</span>
              </div>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="desc">
              <div className="flex items-center gap-2">
                <SortDesc className="h-4 w-4" />
                <span>Descending</span>
              </div>
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Filter badges display */}
      <div className="flex items-center gap-1 flex-wrap">
        {starredOnly && (
          <Badge
            variant="outline"
            className="flex items-center gap-1 bg-primary/10 border-primary/30"
          >
            <StarIcon className="h-3 w-3 text-yellow-400" />
            <span>Starred</span>
            <button
              className="ml-1 text-muted-foreground hover:text-foreground"
              onClick={() => onStarredChange(false)}
            >
              <span className="sr-only">Remove starred filter</span>×
            </button>
          </Badge>
        )}

        {selectedFolders.map((folderId) => {
          const folder = folders.find((f) => f.id === folderId);
          if (!folder) return null;

          return (
            <Badge
              key={folder.id}
              variant="outline"
              className="flex items-center gap-1 bg-primary/10 border-primary/30"
            >
              {getIconForFolder(folder.name, "h-3 w-3")}
              <span>{folder.name}</span>
              <button
                className="ml-1 text-muted-foreground hover:text-foreground"
                onClick={() => onFolderSelect(folder.id)}
              >
                <span className="sr-only">Remove {folder.name} filter</span>×
              </button>
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
