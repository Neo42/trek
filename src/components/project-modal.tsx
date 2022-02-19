import * as React from 'react'
import {Button, Form, Input, Spin} from 'antd'
import {useForm} from 'antd/es/form/Form'
import styled from '@emotion/styled'
import {
  useAddProject,
  useEditProject,
  useProjectModal,
  useProjectQueryKey,
} from 'utils'
import {UserSelect} from './user-select'
import {ErrorMessage} from './lib'
import {Modal} from './modal'

export const ProjectModal = () => {
  const {
    editedItem: editedProject,
    modalState: {closeModal},
  } = useProjectModal()
  const projectQueryKey = useProjectQueryKey()
  const useMutateProject = editedProject ? useEditProject : useAddProject
  const {
    mutateAsync: editProject,
    error,
    isLoading: loading,
  } = useMutateProject(projectQueryKey)
  const [form] = useForm()

  const handleSubmit = async (values: any) => {
    await editProject({
      ...editedProject,
      ...values,
      // add this fake id to fix antd table rowKey absence before real id comes back
      id: editedProject?.id ?? -1,
    })
    form.resetFields()
    closeModal()
  }

  React.useEffect(() => {
    if (!editedProject) form.resetFields()
    form.setFieldsValue(editedProject)
  }, [editedProject, form])

  return (
    <Modal>
      <Container>
        <h1>{editedProject ? 'Edit Project' : 'Create Project'}</h1>
        {loading ? (
          <Spin size="large" />
        ) : (
          <>
            <ErrorMessage error={error as Error} />
            <Form
              layout="vertical"
              style={{width: '40rem'}}
              onFinish={handleSubmit}
              {...{form}}
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {required: true, message: 'Please enter project name.'},
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Department"
                name="department"
                rules={[
                  {required: true, message: 'Please enter department name.'},
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item label="Principal" name="ownerId">
                <UserSelect defaultOptionName="Principal" />
              </Form.Item>

              <Form.Item style={{textAlign: 'right'}}>
                <Button {...{loading}} type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Modal>
  )
}

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
