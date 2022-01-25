export interface Project {
  id: string
  name: string
  principalId: string
  group: string
  createdAt: number
}

export interface User {
  id: string
  name: string
  email: string
  title: string
  group: string
  token: string
}

export interface ProjectListProps {
  projects: Project[]
  users: User[]
}

interface ProjectSearchProps {
  params: {name: string; principalId: string}
  setParams: (params: ProjectSearchProps['params']) => void
  users: User[]
}
