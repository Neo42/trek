export interface Project {
  id: number
  name: string
  principalId: number
  group: string
  createdAt: number
}

export interface User {
  id: number
  name: string
  email: string
  title: string
  group: string
}

export interface ProjectListProps {
  projects: Project[]
  users: User[]
}

interface ProjectSearchProps {
  params: {name: string; principalId: number}
  setParams: (params: ProjectSearchProps['params']) => void
  users: User[]
}
