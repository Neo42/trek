import {Dropdown, Menu, Modal, Table} from 'antd'
import dayjs from 'dayjs'
import {Link} from 'react-router-dom'
import {ModalOpenButton, NoPaddingButton, Pin} from 'components'
import {ProjectListProps} from 'types'
import {
  useEditProject,
  useDeleteProject,
  useProjectModal,
  useProjectQueryKey,
} from 'utils'

export function ProjectList({users, ...restProps}: ProjectListProps) {
  const projectQueryKey = useProjectQueryKey()
  const {mutate: setIsProjectPinned} = useEditProject(projectQueryKey)
  const toggleIsProjectPinned = (id: number) => (isPinned: boolean) =>
    setIsProjectPinned({id, isPinned})

  return (
    <Table
      loading
      pagination={false}
      rowKey="id"
      columns={[
        {
          title: <Pin checked disabled />,
          render(_, project) {
            return (
              <Pin
                key={project.id}
                checked={project.isPinned}
                onChange={toggleIsProjectPinned(project.id)}
              />
            )
          },
        },
        {
          title: 'Name',
          render(_, project) {
            return (
              <Link to={String(project.id)} key={project.id}>
                {project.name}
              </Link>
            )
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
          sorter: (a, b) => b.creationDate - a.creationDate,
          render(_, project) {
            return (
              <span key={project.id}>
                {project.creationDate
                  ? dayjs(project.creationDate).format('YYYY-MM-DD')
                  : ''}
              </span>
            )
          },
        },
        {
          title: 'More',
          align: 'center',
          render(_, project) {
            return (
              <Dropdown
                key={project.id}
                placement="bottomCenter"
                overlay={<More id={project.id} />}
              >
                <NoPaddingButton type="link">···</NoPaddingButton>
              </Dropdown>
            )
          },
        },
      ]}
      {...restProps}
    />
  )
}

const More = ({id}: {id: number}) => {
  const projectQueryKey = useProjectQueryKey()
  const {handleEditItem: handleEditProject} = useProjectModal()
  const editProject = (id: number) => () => handleEditProject(id)
  const {mutateAsync: deleteProject} = useDeleteProject(projectQueryKey)

  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      content: 'Are you sure you want to delete this project?',
      okText: 'Confirm',
      okButtonProps: {danger: true},
      onOk: () => deleteProject(id),
      cancelText: 'Cancel',
    })
  }

  return (
    <Menu>
      <ModalOpenButton>
        <Menu.Item key="edit" onClick={editProject(id)}>
          Edit
        </Menu.Item>
      </ModalOpenButton>
      <Menu.Item key="delete" onClick={() => confirmDeleteProject(id)}>
        Delete
      </Menu.Item>
    </Menu>
  )
}
