import {Dropdown, Menu, Table} from 'antd'
import dayjs from 'dayjs'
import {Link} from 'react-router-dom'
import {ModalOpenButton, NoPaddingButton, Pin} from 'components'
import {ProjectListProps} from './index.d'
import {useEditProject} from 'utils'
import {useProjectModal} from '../../utils/projects'

export function ProjectList({users, ...restProps}: ProjectListProps) {
  const {mutate} = useEditProject()
  const {handleEditProject} = useProjectModal()

  const pinProject = (id: number) => (pinned: boolean) => mutate({id, pinned})
  const editProject = (id: number) => () => handleEditProject(id)

  return (
    <Table
      loading
      pagination={false}
      rowKey={(project) => project.id}
      columns={[
        {
          title: <Pin checked disabled />,
          render(_, project) {
            return (
              <Pin checked={project.pinned} onChange={pinProject(project.id)} />
            )
          },
        },
        {
          title: 'Name',
          render(_, project) {
            return <Link to={String(project.id)}>{project.name}</Link>
          },
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: 'Department',
          dataIndex: 'department',
        },
        {
          title: 'Principal',
          render(_, project) {
            const user = users.find((user) => user.id === project.ownerId)
            return <span>{user?.name ?? 'Unknown'}</span>
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
        {
          render(_, project) {
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key="edit">
                      <ModalOpenButton>
                        <NoPaddingButton
                          type="link"
                          onClick={editProject(project.id)}
                        >
                          Edit
                        </NoPaddingButton>
                      </ModalOpenButton>
                    </Menu.Item>
                  </Menu>
                }
              >
                <NoPaddingButton type="link">...</NoPaddingButton>
              </Dropdown>
            )
          },
        },
      ]}
      {...restProps}
    />
  )
}
