/** @jsxImportSource @emotion/react */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {jsx} from '@emotion/react'
import {Form, Input} from 'antd'
import {UserSelect} from 'components'
import {ProjectSearchProps} from './index.d'

export function ProjectSearch({
  params: {name, ownerId},
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
              ownerId,
              name: event.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          placeholder="Principal"
          value={ownerId}
          onChange={(value) => {
            setParams({
              name,
              ownerId: value || undefined,
            })
          }}
          defaultOptionName="Principal"
        />
      </Form.Item>
    </Form>
  )
}
