import * as React from 'react'
import {Button, Form, Input, Spin} from 'antd'
import {useForm} from 'antd/es/form/Form'
import styled from '@emotion/styled'
import {useAddProject, useEditProject, useProjectModal} from 'utils'
import {UserSelect} from './user-select'
import {ErrorMessage} from './lib'
import {Modal} from './modal'

export const ProjectModal = () => {
  const {editedProject, closeModal} = useProjectModal()
  const useMutateProject = editedProject ? useEditProject : useAddProject

  const {mutateAsync, error, isLoading} = useMutateProject()
  const [form] = useForm()
  const handleSubmit = (values: any) => {
    mutateAsync({...editedProject, ...values}).then(() => {
      form.resetFields()
      closeModal()
    })
  }

  React.useEffect(() => {
    if (!editedProject) form.resetFields()
    form.setFieldsValue(editedProject)
  }, [editedProject, form])

  return (
    <Modal title={editedProject ? 'Edit Project' : 'Create Project'}>
      <Container>
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <>
            <ErrorMessage error={error as Error} />
            <Form
              form={form}
              layout="vertical"
              style={{width: '40rem'}}
              onFinish={handleSubmit}
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
                <Button loading={isLoading} type="primary" htmlType="submit">
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