import {Table} from 'antd'
import dayjs from 'dayjs'
import {ProjectListProps} from './index.d'

export function ProjectList({users, ...restProps}: ProjectListProps) {
  return (
    <Table
      loading
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
      {...restProps}
    />
  )
}
