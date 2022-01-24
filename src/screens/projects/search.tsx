import React from 'react'
import {ProjectSearchProps} from './index.d'

function ProjectSearch({
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
        onChange={(e) =>
          setParams({
            principalId,
            name: e.target.value,
          })
        }
      />
      <select
        title="select principal"
        value={principalId}
        onChange={(e) =>
          setParams({
            name,
            principalId: parseInt(e.target.value),
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

export {ProjectSearch}
