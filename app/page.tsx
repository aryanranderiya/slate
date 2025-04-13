"use client";

import { CategoryHeader } from "@/components/category-header";
import { CreateNoteButton } from "@/components/create-note-button";
import { FolderSidebar } from "@/components/folder-sidebar";
import { NoteEditor } from "@/components/note-editor";
import { NotesGrid } from "@/components/notes-grid";
import { SearchBar } from "@/components/search-bar";
import { useFolders } from "@/hooks/use-folders";
import { useNotes } from "@/hooks/use-notes";
import { useSearch } from "@/hooks/use-search";
import type { Note } from "@/types";
import { useEffect, useState } from "react";

export default function NotesApp() {
  const { folders, activeFolder, setActiveFolder, addFolder } = useFolders();
  const { notes, addNote, updateNote, deleteNote } = useNotes(folders);
  const { searchQuery, setSearchQuery, filteredNotes } = useSearch(
    notes,
    activeFolder
  );

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleCreateNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "",
      content: "",
      folderId: activeFolder,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setCurrentNote(newNote);
    setIsEditorOpen(true);
  };

  const handleEditNote = (note: Note) => {
    setCurrentNote(note);
    setIsEditorOpen(true);
  };

  const handleSaveNote = (note: Note) => {
    if (!note.id) return;

    if (notes.some((n) => n.id === note.id)) {
      updateNote(note);
    } else {
      addNote(note);
    }
    setIsEditorOpen(false);
    setCurrentNote(null);
  };

  const handleCloseEditor = () => {
    setIsEditorOpen(false);
    setCurrentNote(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" || (e.key === "k" && (e.metaKey || e.ctrlKey))) {
        e.preventDefault();
        document.getElementById("search-input")?.focus();
      }

      if (e.key === "Escape" && isEditorOpen) {
        handleCloseEditor();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isEditorOpen]);

  return (
    <div className="flex h-screen bg-zinc-100 text-zinc-900 overflow-hidden">
      <FolderSidebar
        folders={folders}
        activeFolder={activeFolder}
        setActiveFolder={setActiveFolder}
        noteCount={notes.reduce((acc, note) => {
          acc[note.folderId] = (acc[note.folderId] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)}
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
        onAddNote={handleCreateNote}
      />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="sticky top-0 z-10 sm:px-7 sm:pt-8 px-4 rounded-b-3xl py-3 border-b-2 pb-7 bg-white border-t-0 flex flex-col items-start justify-center overflow-hidden">
          {/*  min-h-[180px] */}
          {/* <Image
            src="/image.png"
            fill={true}
            alt="Banner"
            className="z-0 inset-0 top-0 w-full h-full overflow-hidden object-cover object-center m-4 rounded-3xl opacity-25 blur-sm"
          /> */}

          <CategoryHeader
            folders={folders}
            activeFolderId={activeFolder}
            toggleSidebar={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </header>

        <main className="flex-1 overflow-auto p-4 md:p-6">
          <NotesGrid
            notes={filteredNotes}
            folders={folders}
            onNoteClick={handleEditNote}
          />
        </main>

        <CreateNoteButton onClick={handleCreateNote} />
      </div>

      {isEditorOpen && (
        <NoteEditor
          note={currentNote}
          folders={folders}
          onSave={handleSaveNote}
          onClose={handleCloseEditor}
          onDelete={deleteNote}
          onAddFolder={addFolder}
        />
      )}
    </div>
  );
}
