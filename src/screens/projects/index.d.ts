import {TableProps} from 'antd'

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

export interface ProjectListProps extends TableProps<Project> {
  users: User[]
}

export interface ProjectSearchProps {
  params: Pick<Project, 'name' | 'ownerId'>
  setParams: (params: ProjectSearchProps['params']) => void
  users: User[]
}
