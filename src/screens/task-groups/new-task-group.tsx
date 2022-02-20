import * as React from 'react'
import styled from '@emotion/styled'
import {Drawer, DrawerProps, Form, Button, Input, Spin} from 'antd'
import {useForm} from 'antd/es/form/Form'
import {ErrorMessage} from 'components'
import {useAddTaskGroup, useTaskGroupsQueryKey, useProjectId} from 'utils'

export const NewTaskGroup = ({
  visible,
  onClose,
}: Pick<DrawerProps, 'visible'> & {onClose: () => void}) => {
  const {
    isLoading: loading,
    error,
    mutateAsync: addTaskGroup,
  } = useAddTaskGroup(useTaskGroupsQueryKey())
  const [form] = useForm()
  const projectId = useProjectId()
  const handleSubmit = async (values: any) => {
    await addTaskGroup({...values, projectId})
    onClose()
  }

  React.useEffect(() => {
    form.resetFields()
  }, [form, visible])

  return (
    <Drawer
      forceRender
      destroyOnClose
      width="100%"
      visible={visible}
      onClose={onClose}
    >
      <Container>
        {loading ? (
          <Spin size="large" />
        ) : (
          <>
            <h1>Create Task Group</h1>
            <ErrorMessage error={error as Error} />
            <Form
              layout="vertical"
              style={{width: '40rem'}}
              onFinish={handleSubmit}
              form={form}
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {required: true, message: 'Please enter task group name.'},
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item style={{textAlign: 'right'}}>
                <Button loading={loading} type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  )
}

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
