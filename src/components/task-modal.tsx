import * as React from 'react'
import {Button, Form, Input, Modal, Spin} from 'antd'
import {useForm} from 'antd/es/form/Form'
import {useDeleteTask, useEditTask, useTaskModal, useTasksQueryKey} from 'utils'
import {UserSelect} from './user-select'
import {TaskTypeSelect} from './task-type-select'
import {ErrorMessage} from './lib'

export const TaskModal = () => {
  const {
    editedItem: editedTask,
    targetItemId: targetTaskId,
    modalState: {closeModal},
  } = useTaskModal()
  const tasksQueryKey = useTasksQueryKey()
  const {mutateAsync: editTask, error, isLoading} = useEditTask(tasksQueryKey)
  const {mutateAsync: deleteTask} = useDeleteTask(tasksQueryKey)
  const [form] = useForm()

  const handleCancel = () => {
    form.resetFields()
    closeModal()
  }

  const handleSubmit = async () => {
    await editTask({...editedTask, ...form.getFieldsValue()})
    closeModal()
  }

  const handleDelete = () => {
    Modal.confirm({
      okText: 'Confirm',
      cancelText: 'Cancel',
      content: 'Are you sure you want to delete this kanban?',
      onOk: () => deleteTask(editedTask?.id ?? 0),
    })
    closeModal()
  }

  React.useEffect(() => form.setFieldsValue(editedTask), [editedTask, form])

  return (
    <Modal
      forceRender
      okText="Save"
      cancelText="Cancel"
      onCancel={handleCancel}
      onOk={handleSubmit}
      confirmLoading={isLoading}
      title="Edit Task"
      visible={!!targetTaskId}
    >
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <>
          <ErrorMessage error={error as Error} />
          <Form
            initialValues={editedTask}
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            {...{form}}
          >
            <Form.Item
              label="Task Name"
              name="name"
              rules={[{required: true, message: 'Please enter task name.'}]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Assignee" name="assigneeId">
              <UserSelect defaultOptionName="Assignee" />
            </Form.Item>

            <Form.Item label="Type" name="typeId">
              <TaskTypeSelect />
            </Form.Item>
          </Form>
        </>
      )}
      <div style={{textAlign: 'right'}}>
        <Button
          onClick={handleDelete}
          size="small"
          danger
          style={{fontSize: '14px'}}
        >
          Delete
        </Button>
      </div>
    </Modal>
  )
}
