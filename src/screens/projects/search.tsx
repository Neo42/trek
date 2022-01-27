import * as React from 'react'
import {ProjectSearchProps} from './index.d'

export function ProjectSearch({
  params: {name, principalId},
  setParams,
  users,
}: ProjectSearchProps) {
  return (
    <form>
      <input
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
      <select
        title="select principal"
        value={principalId}
        onChange={(event) =>
          setParams({
            name,
            principalId: event.target.value,
          })
        }
      >
        <option value={''}>Principal</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </form>
  )
}
