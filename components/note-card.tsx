"use client";

import type { Folder, Note } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface NoteCardProps {
  note: Note;
  folders: Folder[];
  onClick: (note: Note) => void;
  onToggleStar?: (noteId: string, starred: boolean) => void;
}

export function NoteCard({
  note,
  folders,
  onClick,
  onToggleStar,
}: NoteCardProps) {
  const getFolderColor = (folderId: string): string => {
    const folder = folders.find((f) => f.id === folderId);
    return folder?.color || "#ffffff";
  };
  const backgroundColor = getFolderColor(note.folderId);
  const bgColorWithOpacity = `${backgroundColor}20`;
  const shadowColor = `${backgroundColor}30`;
  const [formattedDate, setFormattedDate] = useState("Loading...");

  useEffect(() => {
    if (note.updatedAt) {
      setFormattedDate(
        formatDistanceToNow(new Date(note.updatedAt), {
          addSuffix: true,
        })
      );
    } else {
      setFormattedDate("Just now");
    }
  }, [note.updatedAt]);

  return (
    <div
      onClick={() => onClick(note)}
      style={
        {
          backgroundColor: bgColorWithOpacity,
          "--shadow-color": shadowColor,
        } as React.CSSProperties
      }
      className="rounded-2xl p-4 aspect-square shadow-none hover:scale-[1.02] transition-all duration-200 cursor-pointer flex flex-col h-full justify-between overflow-hidden"
    >
      {" "}
      <div className="flex flex-col items-start">
        <div
          style={{
            backgroundColor: bgColorWithOpacity,
          }}
          className={
            "text-xs px-3 mb-2 gap-1 pl-2 py-1 rounded-full flex items-center"
          }
        >
          <div
            className="min-h-2 min-w-2 rounded-full"
            style={{ backgroundColor }}
          />
          {/* {getIconForFolder(note.folderId, "min-w-4 h-4")} */}

          {note.folderId && (
            <span>
              {folders.find((f) => f.id === note.folderId)?.name || "No Folder"}
            </span>
          )}
        </div>
        <h3 className="text-3xl line-clamp-1 mb-2 overflow-hidden text-ellipsis title-font max-w-full">
          {note.title || "Untitled"}
        </h3>
        <p className="text-zinc-600 text-sm mb-3 line-clamp-3 sm:line-clamp-4 md:line-clamp-5 lg:line-clamp-6">
          {note.content || "No content"}
        </p>
      </div>
      <div className="flex w-full flex-row items-center">
        <p className="text-zinc-400 text-xs mt-full">{formattedDate}</p>
        {onToggleStar && (
          <button
            className="ml-auto"
            onClick={(e) => {
              e.stopPropagation();
              onToggleStar(note.id, !note.starred);
              toast.success("Successfully starred Note!", {
                description: note.title,
              });
            }}
            aria-label={note.starred ? "Unstar note" : "Star note"}
          >
            <Star
              size={20}
              className={`${
                note.starred
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-zinc-400 hover:text-yellow-400"
              } transition-colors`}
            />
          </button>
        )}
      </div>
    </div>
  );
}
