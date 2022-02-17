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

export interface Kanban {
  id: number
  name: string
  projectId: number
}

export interface Task {
  id: number
  name: string
  tags: number[]
  author: number
  assigneeId: number
  taskGroupId: number
  kanbanId: number
  projectId: number
  favorite: boolean
  typeId: number
  note: string
}

export interface TaskType {
  id: number
  name: 'issue' | 'bug'
}

export interface TaskTag {
  id: number
  name: string
}
