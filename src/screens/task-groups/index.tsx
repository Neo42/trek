import * as React from 'react'
import {Link} from 'react-router-dom'
import {Button, List, Modal} from 'antd'
import dayjs from 'dayjs'
import {Row, ScreenContainer} from 'components'
import {
  useDeleteTaskGroup,
  useProject,
  useProjectId,
  useTaskGroups,
  useTaskGroupsQueryKey,
  useTaskGroupsSearchParams,
  useTasks,
} from 'utils'
import {NewTaskGroup} from './new-task-group'
import {TaskGroup} from 'types'

export const TaskGroupsScreen = () => {
  const projectId = useProjectId()
  const {data: currentProject} = useProject(projectId)
  const {data: taskGroups} = useTaskGroups(useTaskGroupsSearchParams())
  const {data: tasks} = useTasks({projectId})
  const {mutateAsync: deleteTaskGroup} = useDeleteTaskGroup(
    useTaskGroupsQueryKey(),
  )
  const [isNewTaskGroupVisible, setIsNewTaskGroupVisible] =
    React.useState(false)

  const confirmDeleteTaskGroup = (taskGroup: TaskGroup) => {
    Modal.confirm({
      content: 'Are you sure to delete this task group?',
      okText: 'Confirm',
      onOk: () => {
        deleteTaskGroup(taskGroup.id)
      },
    })
  }

  return (
    <ScreenContainer>
      <Row spaceBetween>
        <h1>{currentProject?.name} Task Groups</h1>
        <Button onClick={() => setIsNewTaskGroupVisible(true)} type="link">
          Create Task Group
        </Button>
      </Row>
      <List
        style={{overflow: 'scroll'}}
        dataSource={taskGroups}
        itemLayout="vertical"
        renderItem={(taskGroup) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Row spaceBetween>
                  <span>{taskGroup.name}</span>
                  <Button
                    type="link"
                    onClick={() => confirmDeleteTaskGroup(taskGroup)}
                  >
                    删除
                  </Button>
                </Row>
              }
              description={
                <div>
                  <div>
                    Start Date:{' '}
                    {dayjs(taskGroup.startDate).format('YYYY-MM-DD')}
                  </div>
                  <div>
                    End Date: {dayjs(taskGroup.endDate).format('YYYY-MM-DD')}
                  </div>
                </div>
              }
            />
            <div>
              {tasks
                ?.filter((task) => task.taskGroupId === taskGroup.id)
                .map((task) => (
                  <Link
                    key={task.id}
                    to={`/projects/${projectId}/kanbans?targetItemId=${task.id}`}
                  >
                    {task.name}
                  </Link>
                ))}
            </div>
          </List.Item>
        )}
      />
      <NewTaskGroup
        onClose={() => setIsNewTaskGroupVisible(false)}
        visible={isNewTaskGroupVisible}
      />
    </ScreenContainer>
  )
}
