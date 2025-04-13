"use client"

import { useState } from "react"
import type { Folder } from "@/types"

export const ALL_NOTES_ID = "all"

const initialFolders: Folder[] = [
  { id: ALL_NOTES_ID, name: "All", color: "#828282" },
  { id: "work", name: "Work", color: "#6f00ff" },
  { id: "personal", name: "Personal", color: "#00bbff" },
  { id: "ideas", name: "Ideas", color: "#fce303" },
  { id: "projects", name: "Projects", color: "#03fcb1" },
  { id: "education", name: "Education", color: "#0037ff" },
  { id: "finance", name: "Finance", color: "#ff0000" },
  { id: "travel", name: "Travel", color: "#fc6b03" },
]

export function useFolders() {
  const [folders, setFolders] = useState<Folder[]>(initialFolders)
  const [activeFolder, setActiveFolder] = useState<string>(folders[0].id)

  const addFolder = (folder: Folder) => {
    setFolders([...folders, folder])
  }

  return {
    folders,
    activeFolder,
    setActiveFolder,
    addFolder,
  }
}
