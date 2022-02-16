export interface Project {
  id: number
  name: string
  ownerId: number | undefined
  department: string
  creationDate: number
  isPinned: boolean
}
