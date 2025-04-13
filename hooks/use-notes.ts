"use client"

import { useState } from "react"
import type { Note, Folder } from "@/types"

// Generate dummy notes
function generateDummyNotes(folders: Folder[]): Note[] {
  const notes: Note[] = []

  const titles = [
    "Meeting with design team",
    "Project roadmap",
    "Vacation plans",
    "Book recommendations",
    "Gift ideas",
    "Weekly goals",
    "Recipe for pasta",
    "Workout routine",
    "Home renovation ideas",
    "Movies to watch",
    "Learning resources",
    "Conference notes",
  ]

  const contents = [
    "Discussed new design system and component library. Need to follow up with Sarah about the color palette.",
    "Q1: Research and planning\nQ2: Development\nQ3: Testing\nQ4: Launch and marketing",
    "Looking at Italy or Greece for summer. Need to check flight prices and accommodations.",
    "1. Atomic Habits\n2. The Psychology of Money\n3. Project Hail Mary\n4. The Midnight Library",
    "Mom: cookbook\nDad: wireless headphones\nSister: art supplies\nBrother: video game",
    "1. Finish project proposal\n2. Schedule team meeting\n3. Update documentation\n4. Review code PRs",
    "Ingredients:\n- Pasta\n- Olive oil\n- Garlic\n- Tomatoes\n- Basil\n\nCook pasta according to package. Sauté garlic in olive oil...",
    "Monday: Upper body\nTuesday: Cardio\nWednesday: Lower body\nThursday: Rest\nFriday: Full body\nWeekend: Active recovery",
    "Kitchen: new countertops and backsplash\nLiving room: repaint walls and new furniture\nBathroom: retile shower",
    "1. Everything Everywhere All at Once\n2. The Batman\n3. Top Gun: Maverick\n4. Dune",
    "Frontend Masters courses\nMDN Web Docs\nReact documentation\nTypeScript handbook",
    "Speaker highlights:\n- Jane Doe on AI ethics\n- John Smith on cloud architecture\n- Sarah Johnson on UX research methods",
  ]

  // Distribute notes across folders
  for (let i = 0; i < titles.length; i++) {
    const folderId = folders[i % folders.length].id
    const createdAt = new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000)

    notes.push({
      id: `note-${i + 1}`,
      title: titles[i],
      content: contents[i],
      folderId,
      createdAt,
      updatedAt: new Date(createdAt.getTime() + Math.floor(Math.random() * 5) * 24 * 60 * 60 * 1000),
    })
  }

  return notes
}

export function useNotes(folders: Folder[]) {
  const [notes, setNotes] = useState<Note[]>(() => {
    // Initialize notes
    const initialNotes = generateDummyNotes(folders);

    // Try to load starred status from localStorage
    try {
      const storedStarredNotes = localStorage.getItem('starredNotes');
      if (storedStarredNotes) {
        const starredIds = JSON.parse(storedStarredNotes) as string[];

        // Apply stored starred status to the initial notes
        return initialNotes.map(note => ({
          ...note,
          starred: starredIds.includes(note.id)
        }));
      }
    } catch (error) {
      console.error('Failed to load starred notes from localStorage:', error);
    }

    return initialNotes;
  })

  const addNote = (note: Note) => {
    setNotes([...notes, note])
  }

  const updateNote = (updatedNote: Note) => {
    setNotes(notes.map((note) => (note.id === updatedNote.id ? updatedNote : note)))
  }

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  const toggleStar = (id: string, starred: boolean) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, starred } : note
    );
    setNotes(updatedNotes);

    // Save starred note IDs to localStorage
    try {
      const starredIds = updatedNotes
        .filter(note => note.starred)
        .map(note => note.id);
      localStorage.setItem('starredNotes', JSON.stringify(starredIds));
    } catch (error) {
      console.error('Failed to save starred notes to localStorage:', error);
    }
  }

  return {
    notes,
    addNote,
    updateNote,
    deleteNote,
    toggleStar,
  }
}
