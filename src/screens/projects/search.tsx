import {Input, Select} from 'antd'
import * as React from 'react'
import {ProjectSearchProps} from './index.d'

export function ProjectSearch({
  params: {name, principalId},
  setParams,
  users,
}: ProjectSearchProps) {
  return (
    <form>
      <Input
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
      <Select
        value={principalId}
        onChange={(value) =>
          setParams({
            name,
            principalId: value,
          })
        }
      >
        <Select.Option value={''}>Principal</Select.Option>
        {users.map((user) => (
          <Select.Option key={user.id} value={user.id}>
            {user.name}
          </Select.Option>
        ))}
      </Select>
    </form>
  )
}
