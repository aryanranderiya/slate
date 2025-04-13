"use client";

import { NewCategoryDialog } from "@/components/new-category-dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { lightenColor } from "@/lib/color-utils";
import { cn } from "@/lib/utils";
import type { Folder, Note } from "@/types";
import { Plus, Trash, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface NoteEditorProps {
  note: Note | null;
  folders: Folder[];
  onSave: (note: Note) => void;
  onClose: () => void;
  onDelete: (id: string) => void;
  onAddFolder?: (folder: Folder) => void;
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
  const [titleError, setTitleError] = useState(false);

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
    // Validate title
    if (!editedNote.title.trim()) {
      setTitleError(true);
      toast.error("Please add a title to your note");
      titleRef.current?.focus();
      return;
    }

    const updatedNote = {
      ...editedNote,
      title: editedNote.title.trim(),
      updatedAt: new Date(),
    };

    onSave(updatedNote);
    toast.success("Note saved successfully");
  };

  const handleDelete = () => {
    if (editedNote.id) {
      toast.promise(
        new Promise<void>((resolve) => {
          if (confirm("Are you sure you want to delete this note?")) {
            onDelete(editedNote.id);
            onClose();
          }
          resolve();
        }),
        {
          loading: "Deleting note...",
          success: "Note deleted successfully",
          error: "Failed to delete note",
        }
      );
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
          backdropFilter: "blur(10px)",
        }}
        className={cn(
          "fixed right-0 top-0 h-full w-full sm:w-[32rem] bg-white z-50 shadow-xl flex flex-col transition-transform duration-300 ease-in-out",
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
              aria-label="Delete note"
            >
              <Trash size={18} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-zinc-500 hover:text-zinc-900 rounded-lg hover:bg-zinc-100 transition-colors"
              aria-label="Close editor"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto px-4 relative z-50">
          <div className="relative">
            <input
              ref={titleRef}
              type="text"
              placeholder="Title"
              value={editedNote.title}
              onChange={(e) => {
                setEditedNote({ ...editedNote, title: e.target.value });
                if (e.target.value.trim()) setTitleError(false);
              }}
              className={cn(
                "w-full title-font text-4xl tracking-tight mb-2 bg-transparent border-none focus:outline-none focus:ring-0 p-0",
                titleError && "placeholder:text-red-400"
              )}
              aria-invalid={titleError}
            />
            {titleError && (
              <div className="text-red-500 text-sm mb-2">
                Please add a title to your note
              </div>
            )}
          </div>

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

      <NewCategoryDialog
        open={isNewCategoryOpen}
        onOpenChange={setIsNewCategoryOpen}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        onAddFolder={onAddFolder}
        onCategoryCreated={(folderId) =>
          setEditedNote({ ...editedNote, folderId })
        }
      />
    </>
  );
}
