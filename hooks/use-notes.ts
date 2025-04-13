"use client";

import type { Note } from "@/types";
import { useEffect, useState } from "react";
import { useFolders } from "./use-folders";

export function useNotes() {
  const { folders } = useFolders();

  const folderIds = {
    work: folders.find((f) => f.name.toLowerCase() === "work")?.id,
    all: folders.find((f) => f.name.toLowerCase() === "all")?.id,
    personal: folders.find((f) => f.name.toLowerCase() === "personal")?.id,
    ideas: folders.find((f) => f.name.toLowerCase() === "ideas")?.id,
    education: folders.find((f) => f.name.toLowerCase() === "education")?.id,
    finance: folders.find((f) => f.name.toLowerCase() === "finance")?.id,
    travel: folders.find((f) => f.name.toLowerCase() === "travel")?.id,
    projects: folders.find((f) => f.name.toLowerCase() === "projects")?.id,
    default: folders[0]?.id || "all",
  };


  const dummyNotes: Note[] = [
    {
      id: "note-1",
      title: "Q1 Project Planning Meeting",
      content:
        "Discussed key milestones:\n- Frontend redesign by March\n- API migration by February\n- Load testing completion by January\n\nAction items:\n1. Sarah to finalize design system\n2. Mike to setup CI/CD pipeline\n3. Schedule weekly progress reviews",
      folderId: folderIds.work || folderIds.default,
      createdAt: new Date("2025-01-15T09:30:00"),
      updatedAt: new Date("2025-01-15T11:45:00"),
    },
    {
      id: "note-2",
      title: "Japan Travel Itinerary",
      content:
        "Tokyo (5 days):\n- Shibuya Crossing\n- TeamLab Borderless\n- Tsukiji Market\n\nKyoto (4 days):\n- Fushimi Inari\n- Arashiyama Bamboo Grove\n- Kinkaku-ji\n\nOsaka (3 days):\n- Dotonbori\n- Osaka Castle\n- Universal Studios",
      folderId: folderIds.travel || folderIds.default,
      createdAt: new Date("2025-02-01T15:20:00"),
      updatedAt: new Date("2025-02-10T18:30:00"),
    },
    {
      id: "note-3",
      title: "React Performance Optimization",
      content:
        "Key techniques:\n1. useMemo for expensive calculations\n2. useCallback for function memoization\n3. React.memo for component memoization\n4. Virtual list for large datasets\n5. Code splitting with lazy loading\n\nTools:\n- React DevTools\n- Lighthouse\n- Chrome Performance tab",
      folderId: folderIds.projects || folderIds.default,
      createdAt: new Date("2025-03-05T11:00:00"),
      updatedAt: new Date("2025-03-07T14:15:00"),
    },
    {
      id: "note-4",
      title: "Home Workout Routine",
      content:
        "Circuit Training (30 mins):\n1. 20 pushups\n2. 30 squats\n3. 15 burpees\n4. 1 min plank\n5. 20 lunges each leg\n\nRepeat 3 times\nRest 1 min between sets\n\nCardio:\n- 20 min HIIT\n- 5 min cooldown",
      folderId: folderIds.personal || folderIds.default,
      createdAt: new Date("2025-03-10T07:00:00"),
      updatedAt: new Date("2025-03-10T07:30:00"),
    },
    {
      id: "note-5",
      title: "Photography Settings",
      content:
        "Landscape Settings:\n- f/8 to f/11 aperture\n- ISO 100\n- Tripod recommended\n\nPortrait Settings:\n- f/1.8 to f/2.8\n- Fast shutter speed\n- Natural lighting preferred\n\nNight Photography:\n- High ISO (1600+)\n- Slow shutter speed\n- Manual focus",
      folderId: folderIds.personal || folderIds.default,
      createdAt: new Date("2025-03-15T16:45:00"),
      updatedAt: new Date("2025-03-16T10:20:00"),
    },
    {
      id: "note-6",
      title: "Mediterranean Recipe Collection",
      content:
        "Greek Salad:\n- Cucumber\n- Tomatoes\n- Red onion\n- Feta cheese\n- Kalamata olives\n- Olive oil\n- Oregano\n\nHummus:\n- Chickpeas\n- Tahini\n- Garlic\n- Lemon juice\n- Olive oil\n- Cumin",
      folderId: folderIds.personal || folderIds.default,
      createdAt: new Date("2025-03-20T12:00:00"),
      updatedAt: new Date("2025-03-20T13:15:00"),
    },
    {
      id: "note-7",
      title: "2025 Reading List",
      content:
        "Currently Reading:\n1. 'Dune: Messiah' by Frank Herbert\n2. 'The Pragmatic Programmer'\n\nTo Read Next:\n- 'Snow Crash' by Neal Stephenson\n- 'Clean Architecture' by Robert Martin\n- 'Foundation' by Isaac Asimov\n- 'The Design of Everyday Things'",
      folderId: folderIds.education || folderIds.default,
      createdAt: new Date("2025-03-25T21:30:00"),
      updatedAt: new Date("2025-03-26T09:45:00"),
    },
    {
      id: "note-8",
      title: "Personal Finance Tracker",
      content:
        "Monthly Budget:\n- Rent: $2000\n- Utilities: $200\n- Groceries: $500\n- Transportation: $150\n- Entertainment: $300\n- Savings: $1000\n\nInvestments:\n- 401k: 15% of income\n- Index funds: $500/month\n- Emergency fund: 6 months expenses",
      folderId: folderIds.finance || folderIds.default,
      createdAt: new Date("2025-04-01T08:00:00"),
      updatedAt: new Date("2025-04-01T19:20:00"),
    },
    {
      id: "note-9",
      title: "Language Learning Progress",
      content:
        "Spanish:\n- Completed A2 level\n- Daily Duolingo streak: 120 days\n- Watching 'Money Heist' with subtitles\n\nNext Steps:\n1. Join conversation group\n2. Read Spanish news daily\n3. Schedule language exchange\n4. Practice verb conjugations",
      folderId: folderIds.education || folderIds.default,
      createdAt: new Date("2025-04-05T17:15:00"),
      updatedAt: new Date("2025-04-06T10:30:00"),
    },
    {
      id: "note-10",
      title: "Garden Planning",
      content:
        "Spring Planting:\n- Tomatoes (Cherry and Beefsteak)\n- Bell Peppers\n- Basil and Oregano\n- Cucumbers\n- Zucchini\n\nMaintenance Schedule:\n- Water daily morning\n- Fertilize monthly\n- Prune weekly\n- Check for pests bi-weekly",
      folderId: folderIds.all || folderIds.default,
      createdAt: new Date("2025-04-10T14:00:00"),
      updatedAt: new Date("2025-04-10T16:45:00"),
    },
    // Additional dummy notes
    {
      id: "note-11",
      title: "Startup Brainstorming Ideas",
      content:
        "Ideas for the new startup venture:\n- Mobile-first social platform\n- AI-driven analytics\n- Seamless payment integrations\n\nNext Steps:\n- Conduct market research\n- Develop a prototype\n- Prepare a pitch deck",
      folderId: folderIds.ideas || folderIds.default,
      createdAt: new Date("2025-04-12T10:00:00"),
      updatedAt: new Date("2025-04-12T12:00:00"),
    },
    {
      id: "note-12",
      title: "Weekly Work Report",
      content:
        "Highlights this week:\n- Completed quarterly review\n- Rolled out beta feature\n- Coordinated with the design team\n\nPending tasks:\n- Follow-up with client\n- Plan next week’s meeting",
      folderId: folderIds.work || folderIds.default,
      createdAt: new Date("2025-04-13T09:00:00"),
      updatedAt: new Date("2025-04-13T17:00:00"),
    },
    {
      id: "note-13",
      title: "JavaScript Async Patterns",
      content:
        "Discussion points on async patterns in JS:\n- Promises vs async/await\n- Error handling strategies\n- Using Promise.all for concurrency\n\nResources:\n- MDN documentation\n- Relevant GitHub examples",
      folderId: folderIds.projects || folderIds.default,
      createdAt: new Date("2025-04-14T11:30:00"),
      updatedAt: new Date("2025-04-14T13:00:00"),
    },
    {
      id: "note-14",
      title: "Personal Diary Entry",
      content:
        "Today I focused on mindfulness and personal growth. Spent time meditating and reflecting on the day's events.\n\nThoughts:\n- Gratitude for small wins\n- Lessons learned from challenges",
      folderId: folderIds.personal || folderIds.default,
      createdAt: new Date("2025-04-15T20:00:00"),
      updatedAt: new Date("2025-04-15T21:00:00"),
    },
    {
      id: "note-15",
      title: "Travel Budget Breakdown",
      content:
        "Budget for upcoming trip:\n- Flight: $800\n- Accommodation: $1200\n- Food: $400\n- Local transport: $150\n\nEstimated Total: ~$2550",
      folderId: folderIds.travel || folderIds.default,
      createdAt: new Date("2025-04-16T08:30:00"),
      updatedAt: new Date("2025-04-16T09:15:00"),
    },
    {
      id: "note-16",
      title: "Advanced Physics Course Schedule",
      content:
        "Course Topics:\n1. Quantum Mechanics\n2. Thermodynamics\n3. Electromagnetism\n\nSchedule:\n- Lectures on MWF\n- Lab sessions on Fridays\n- Weekly study groups",
      folderId: folderIds.education || folderIds.default,
      createdAt: new Date("2025-04-17T10:00:00"),
      updatedAt: new Date("2025-04-17T11:30:00"),
    },
    {
      id: "note-17",
      title: "Investment Strategies for 2025",
      content:
        "Focus areas:\n- Diversified portfolio with index funds\n- Tech stock monitoring\n- Regular risk review\n\nAction items:\n- Consult with financial advisor\n- Rebalance portfolio quarterly",
      folderId: folderIds.finance || folderIds.default,
      createdAt: new Date("2025-04-18T14:00:00"),
      updatedAt: new Date("2025-04-18T15:45:00"),
    },
  ];

  const [notes, setNotes] = useState<Note[]>(dummyNotes);

  useEffect(() => {
    try {
      const starredIds = JSON.parse(
        localStorage.getItem("starredNotes") || "[]"
      );
      if (starredIds.length > 0) {
        setNotes((prev) =>
          prev.map((note) => ({
            ...note,
            starred: starredIds.includes(note.id),
          }))
        );
      }
    } catch (error) {
      console.error("Failed to load starred notes from localStorage:", error);
    }
  }, []);

  const addNote = (note: Note) => {
    setNotes([...notes, note]);
  };

  const updateNote = (updatedNote: Note) => {
    setNotes(
      notes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const toggleStar = (id: string, starred: boolean) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, starred } : note
    );
    setNotes(updatedNotes);

    try {
      const starredIds = updatedNotes
        .filter((note) => note.starred)
        .map((note) => note.id);
      localStorage.setItem("starredNotes", JSON.stringify(starredIds));
    } catch (error) {
      console.error("Failed to save starred notes to localStorage:", error);
    }
  };

  return {
    notes,
    addNote,
    updateNote,
    deleteNote,
    toggleStar,
  };
}
