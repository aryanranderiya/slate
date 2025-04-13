"use client";

import type { Folder, Note } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";

interface NoteCardProps {
  note: Note;
  folders: Folder[];
  onClick: (note: Note) => void;
}

export function NoteCard({ note, folders, onClick }: NoteCardProps) {
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
      <p className="text-zinc-400 text-xs mt-full">{formattedDate}</p>
    </div>
  );
}
