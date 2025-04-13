export interface Folder {
  id: string
  name: string
  color: string
}

export interface Note {
  id: string
  title: string
  content: string
  folderId: string
  createdAt: Date
  updatedAt: Date
  starred?: boolean
}
