"use client";

import { useState, useEffect, useRef } from "react";
import { X, Trash, Plus } from "lucide-react";
import type { Note, Folder } from "@/types";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface NoteEditorProps {
  note: Note | null;
  folders: Folder[];
  onSave: (note: Note) => void;
  onClose: () => void;
  onDelete: (id: string) => void;
  onAddFolder?: (folder: Folder) => void;
}

export function lightenColor(hex: string | undefined, percent: number) {
  if (!hex) return "#ffffff";
  hex = hex.replace("#", "");
  const num = parseInt(hex, 16);

  let r = (num >> 16) + Math.round(2.55 * percent);
  let g = ((num >> 8) & 0x00ff) + Math.round(2.55 * percent);
  let b = (num & 0x0000ff) + Math.round(2.55 * percent);

  r = Math.min(255, r);
  g = Math.min(255, g);
  b = Math.min(255, b);

  return `#${(0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export function NoteEditor({
  note,
  folders,
  onSave,
  onClose,
  onDelete,
  onAddFolder,
}: NoteEditorProps) {
  const [editedNote, setEditedNote] = useState<Note>(
    note || {
      id: Date.now().toString(),
      title: "",
      content: "",
      folderId: folders[0]?.id || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  );

  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const [isNewCategoryOpen, setIsNewCategoryOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    color: "#4f46e5",
  });

  const currentFolder = folders.find((f) => f.id === editedNote.folderId);
  const bgColorWithOpacity = currentFolder
    ? `${currentFolder.color}90`
    : "transparent";

  useEffect(() => {
    // Animation timing
    requestAnimationFrame(() => {
      setIsVisible(true);
      titleRef.current?.focus();
    });

    // Cleanup animation
    return () => setIsVisible(false);
  }, []);

  const handleSave = () => {
    const updatedNote = {
      ...editedNote,
      updatedAt: new Date(),
    };
    onSave(updatedNote);
  };

  const handleDelete = () => {
    if (
      editedNote.id &&
      confirm("Are you sure you want to delete this note?")
    ) {
      onDelete(editedNote.id);
      onClose();
    }
  };

  const wordCount = editedNote.content
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      <div
        style={{
          // backgroundColor: `${currentFolder?.color}20`,
          backdropFilter: "blur(10px)",
        }}
        className={cn(
          "fixed right-0 top-0 h-full w-full  sm:w-[32rem] bg-white z-50 shadow-xl flex flex-col transition-transform duration-300 ease-in-out",
          isVisible ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div
          className="inset-0 h-full absolute w-full z-[49]"
          style={{
            backgroundColor: lightenColor(currentFolder?.color, 80),
          }}
        />
        <div className="flex items-center relative z-50 justify-end p-4 ">
          <div className="flex items-center gap-2">
            <button
              onClick={handleDelete}
              className="p-2 text-zinc-500 hover:text-red-500 rounded-lg hover:bg-zinc-100 transition-colors"
            >
              <Trash size={18} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-zinc-500 hover:text-zinc-900 rounded-lg hover:bg-zinc-100 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto px-4 relative z-50">
          <input
            ref={titleRef}
            type="text"
            placeholder="Title"
            value={editedNote.title}
            onChange={(e) =>
              setEditedNote({ ...editedNote, title: e.target.value })
            }
            className="w-full text-2xl font-semibold tracking-tight mb-2 bg-transparent border-none focus:outline-none focus:ring-0 p-0"
          />

          <textarea
            placeholder="Write your note here..."
            value={editedNote.content}
            onChange={(e) =>
              setEditedNote({ ...editedNote, content: e.target.value })
            }
            className="w-full h-[calc(100%-4rem)] resize-none bg-transparent border-none focus:outline-none focus:ring-0 p-0 text-zinc-700 leading-relaxed"
          />
        </div>

        <div className="p-4 relative z-50 flex gap-2 flex-col items-end">
          <div className="flex items-center gap-2 justify-between w-full">
            <Select
              value={editedNote.folderId}
              onValueChange={(value) =>
                setEditedNote({ ...editedNote, folderId: value })
              }
            >
              <SelectTrigger className="w-[180px] h-8 rounded-lg border-none">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {folders.map((folder) => (
                  <SelectItem key={folder.id} value={folder.id}>
                    <div className="flex items-center gap-2 flex-row">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: folder.color }}
                      />
                      {folder.name}
                    </div>
                  </SelectItem>
                ))}
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setIsNewCategoryOpen(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Category
                </Button>
              </SelectContent>
            </Select>
            <div className="text-sm text-zinc-500">
              {wordCount} {wordCount === 1 ? "word" : "words"}
            </div>
          </div>
          <button
            onClick={handleSave}
            className="w-full py-2 px-4 bg-zinc-900 text-white rounded-xl hover:bg-zinc-800 transition-colors"
          >
            Save Note
          </button>
        </div>
      </div>

      <Dialog open={isNewCategoryOpen} onOpenChange={setIsNewCategoryOpen}>
        <DialogContent>
          <DialogTitle>Create New Category</DialogTitle>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Input
                placeholder="Category name"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Input
                type="color"
                value={newCategory.color}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, color: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsNewCategoryOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (newCategory.name) {
                  const newFolder: Folder = {
                    id: Date.now().toString(),
                    name: newCategory.name,
                    color: newCategory.color,
                  };
                  onAddFolder?.(newFolder);
                  setEditedNote({ ...editedNote, folderId: newFolder.id });
                  setNewCategory({ name: "", color: "#4f46e5" });
                  setIsNewCategoryOpen(false);
                }
              }}
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
