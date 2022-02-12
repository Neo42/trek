/** @jsxImportSource @emotion/react */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {jsx} from '@emotion/react'
import {Form, Input, Select} from 'antd'
import {ProjectSearchProps} from './index.d'

export function ProjectSearch({
  params: {name, principalId},
  setParams,
  users,
}: ProjectSearchProps) {
  return (
    <Form css={{marginBottom: `2rem`}} layout="inline">
      <Form.Item>
        <Input
          placeholder="Project Name"
          title="search project"
          type="text"
          value={name}
          onChange={(event) =>
            setParams({
              principalId,
              name: event.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <Select
          placeholder="Principal"
          value={principalId}
          onChange={(value) =>
            setParams({
              name,
              principalId: value,
            })
          }
        >
          <Select.Option value={''}>All</Select.Option>
          {users.map((user) => (
            <Select.Option key={user.id} value={String(user.id)}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  )
}
