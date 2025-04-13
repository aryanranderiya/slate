"use client"

import { Plus } from "lucide-react"

interface CreateNoteButtonProps {
  onClick: () => void
}

export function CreateNoteButton({ onClick }: CreateNoteButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed right-6 bottom-6 w-12 h-12 bg-zinc-900 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-zinc-800 hover:scale-105 transition-all duration-200 z-10"
      aria-label="Create new note"
    >
      <Plus size={24} />
    </button>
  )
}
