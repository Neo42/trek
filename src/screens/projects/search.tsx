/** @jsxImportSource @emotion/react */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {jsx} from '@emotion/react'
import {Form, Input} from 'antd'
import {UserSelect} from 'components'
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
        <UserSelect
          placeholder="Principal"
          value={principalId}
          onChange={(value) => {
            setParams({
              name,
              principalId: value || undefined,
            })
          }}
          defaultOptionName="Principal"
        />
      </Form.Item>
    </Form>
  )
}
