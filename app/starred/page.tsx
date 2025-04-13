"use client";

import { redirect } from "next/navigation";

export default function StarredNotesPage() {
  // Redirect to the folder/starred route for consistency
  redirect("/folder/starred");
}
