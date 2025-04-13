"use client";
import { Input } from "@heroui/input";
import { Kbd } from "@heroui/kbd";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="flex items-center gap-2 pt-2 w-full relative z-[1]">
      <Input
        id="search-input"
        type="text"
        variant="faded"
        radius="full"
        size="lg"
        startContent={<Search size={20} className="text-zinc-400" />}
        placeholder="Search notes... (Press '/' to focus)"
        endContent={<Kbd keys={["command"]}>K</Kbd>}
        value={value}
        onValueChange={onChange}
      />
    </div>
  );
}
