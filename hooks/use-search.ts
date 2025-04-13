"use client"

import { useState, useMemo } from "react"
import type { Note } from "@/types"
import { ALL_NOTES_ID } from "./use-folders"

export function useSearch(notes: Note[], activeFolder: string) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredNotes = useMemo(() => {
    if (!notes) return []

    // If there's a search query, filter across all folders
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      return notes.filter(
        (note) => note.title.toLowerCase().includes(query) || note.content.toLowerCase().includes(query),
      )
    }

    // If "All Notes" is selected, return all notes
    if (activeFolder === ALL_NOTES_ID) {
      return notes
    }

    // Otherwise, filter by active folder
    return notes.filter((note) => note.folderId === activeFolder)
  }, [notes, searchQuery, activeFolder])

  return {
    searchQuery,
    setSearchQuery,
    filteredNotes,
  }
}
