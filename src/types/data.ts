export interface Project {
  id: number
  name: string
  ownerId: number | undefined
  department: string
  creationDate: number
  isPinned: boolean
}

export interface User {
  id: number
  name: string
  email: string
  title: string
  department: string
  token: string
}
