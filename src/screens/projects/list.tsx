import {Table} from 'antd'
import dayjs from 'dayjs'
import * as React from 'react'
import {ProjectListProps} from './index.d'

export function ProjectList({projects, users}: ProjectListProps) {
  return (
    <Table
      pagination={false}
      rowKey={(project) => project.id}
      columns={[
        {
          title: 'Name',
          dataIndex: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: 'Group',
          dataIndex: 'group',
        },
        {
          title: 'Principal',
          render(_, project) {
            return (
              <span>
                {users.find((user) => user.id === project.principalId)?.name ??
                  'Unknown'}
              </span>
            )
          },
        },
        {
          title: 'Creation Date',
          render(_, project) {
            return (
              <span>
                {project.creationDate
                  ? dayjs(project.creationDate).format('YYYY-MM-DD')
                  : ''}
              </span>
            )
          },
        },
      ]}
      dataSource={projects}
    ></Table>
  )
}
