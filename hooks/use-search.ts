"use client"

import { useState, useMemo } from "react"
import type { Note } from "@/types"
import { ALL_NOTES_ID } from "./use-folders"

export function useSearch(notes: Note[], activeFolder: string) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredNotes = useMemo(() => {
    if (!notes) return []

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      return notes.filter(
        (note) => note.title.toLowerCase().includes(query) || note.content.toLowerCase().includes(query),
      )
    }

    if (activeFolder === ALL_NOTES_ID) return notes

    return notes.filter((note) => note.folderId === activeFolder)
  }, [notes, searchQuery, activeFolder])

  return {
    searchQuery,
    setSearchQuery,
    filteredNotes,
  }
}
