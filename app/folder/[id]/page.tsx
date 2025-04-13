"use client";

import { use } from "react";
import NotesApp from "../../page";

// Define the proper type for params
type FolderPageParams = {
  params: Promise<{
    id: string;
  }>;
};

export default function FolderPage({ params }: FolderPageParams) {
  // Unwrap params with React.use() as recommended for future compatibility
  const unwrappedParams = use(params);

  // This component renders the main app with the specified folder ID
  return <NotesApp initialFolderId={unwrappedParams.id} />;
}
