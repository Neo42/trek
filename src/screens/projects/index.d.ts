import {TableProps} from 'antd'

export interface Project {
  id: number
  name: string
  principalId: number | undefined
  pin: boolean
  group: string
  creationDate: number
}

export interface User {
  id: number
  name: string
  email: string
  title: string
  group: string
  token: string
}

export interface ProjectListProps extends TableProps<Project> {
  users: User[]
}

export interface ProjectSearchProps {
  params: Pick<Project, 'name' | 'principalId'>
  setParams: (params: ProjectSearchProps['params']) => void
  users: User[]
}
