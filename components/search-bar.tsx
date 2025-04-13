"use client";
import { useFolders } from "@/hooks/use-folders";
import { Input } from "@heroui/input";
import { Kbd } from "@heroui/kbd";
import { Search } from "lucide-react";
import { SearchFilters } from "./search-filters";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  selectedFolders?: string[];
  onFolderSelect?: (folderId: string) => void;
  sortBy?: string;
  onSortChange?: (option: string) => void;
  sortDirection?: "asc" | "desc";
  onSortDirectionChange?: (direction: "asc" | "desc") => void;
  starredOnly?: boolean;
  onStarredChange?: (value: boolean) => void;
}

export function SearchBar({
  value,
  onChange,
  selectedFolders = [],
  onFolderSelect = () => {},
  sortBy = "updatedAt",
  onSortChange = () => {},
  sortDirection = "desc",
  onSortDirectionChange = () => {},
  starredOnly = false,
  onStarredChange = () => {},
}: SearchBarProps) {
  const { folders } = useFolders();

  return (
    <div className="flex flex-row gap-2 pt-2 w-full relative z-[1]">
      <div className="flex items-center gap-2 w-full">
        <Input
          id="search-input"
          type="text"
          variant="faded"
          radius="full"
          size="lg"
          startContent={<Search size={20} className="text-zinc-400" />}
          placeholder="Search notes..."
          endContent={<Kbd className="text-nowrap"> &nbsp; / to Focus</Kbd>}
          value={value}
          onValueChange={onChange}
          className="flex-1"
        />
      </div>
      <div className="flex items-center">
        <SearchFilters
          folders={folders}
          selectedFolders={selectedFolders}
          onFolderSelect={onFolderSelect}
          sortBy={sortBy as any}
          onSortChange={onSortChange as any}
          sortDirection={sortDirection}
          onSortDirectionChange={onSortDirectionChange}
          starredOnly={starredOnly}
          onStarredChange={onStarredChange}
        />
      </div>
    </div>
  );
}
