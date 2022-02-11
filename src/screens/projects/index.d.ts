import {TableProps} from 'antd'

export interface Project {
  id: string
  name: string
  principalId: string
  pin: boolean
  group: string
  creationDate: number
}

export interface User {
  id: string
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
  params: {name: string; principalId: string}
  setParams: (params: ProjectSearchProps['params']) => void
  users: User[]
}
