"use client";

import type { Note, Folder } from "@/types";
import { NoteCard } from "./note-card";

interface NotesGridProps {
  notes: Note[];
  folders: Folder[];
  onNoteClick: (note: Note) => void;
}

export function NotesGrid({ notes, folders, onNoteClick }: NotesGridProps) {
  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-zinc-400">
        <p className="text-lg">No notes found</p>
        <p className="text-sm">Create a new note to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          folders={folders}
          onClick={onNoteClick}
        />
      ))}
    </div>
  );
}
