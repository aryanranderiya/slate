"use client";

import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { Folder } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NewCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newCategory: { name: string; color: string };
  setNewCategory: (category: { name: string; color: string }) => void;
  onAddFolder: ((folder: Folder) => void) | undefined;
  onCategoryCreated: (folderId: string) => void;
}

export function NewCategoryDialog({
  open,
  onOpenChange,
  newCategory,
  setNewCategory,
  onAddFolder,
  onCategoryCreated,
}: NewCategoryDialogProps) {
  const [nameError, setNameError] = useState(false);

  const handleCreateCategory = () => {
    if (!newCategory.name.trim()) {
      setNameError(true);
      toast.error("Please enter a category name");
      return;
    }

    const newFolder: Folder = {
      id: Date.now().toString(),
      name: newCategory.name.trim(),
      color: newCategory.color,
    };

    onAddFolder?.(newFolder);
    onCategoryCreated(newFolder.id);
    setNewCategory({ name: "", color: "#4f46e5" });
    onOpenChange(false);
    toast.success(`Category "${newFolder.name}" created`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle className="title-font text-4xl font-normal">
          Create New Category
        </DialogTitle>
        <DialogDescription className="relative -top-2">
          Create a new category to organize your notes. Choose a name and color
          to help identify it.
        </DialogDescription>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="category-name">Category Name</Label>
            <Input
              id="category-name"
              placeholder="e.g., Work, Personal, Ideas"
              value={newCategory.name}
              onChange={(e) => {
                setNewCategory({ ...newCategory, name: e.target.value });
                if (e.target.value.trim()) setNameError(false);
              }}
              className={cn(nameError && "border-red-500")}
            />
            {nameError && (
              <p className="text-sm text-red-500">Category name is required</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="category-color">Category Color</Label>
            <div className="flex items-center gap-3">
              <Input
                id="category-color"
                type="color"
                value={newCategory.color}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, color: e.target.value })
                }
                className="w-20 h-10 p-1"
              />
              <div className="text-sm text-zinc-500">
                This color will help identify notes in this category
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setNameError(false);
              onOpenChange(false);
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleCreateCategory}>Create Category</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
