import * as React from 'react'
import {ProjectListProps} from './index.d'

function ProjectList({projects, users}: ProjectListProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>name</th>
          <th>principal</th>
        </tr>
      </thead>
      <tbody>
        {projects.map(({name, principalId}) => (
          <tr key={name}>
            <td>{name}</td>
            <td>
              {users.find(({id}) => id === principalId)?.name ?? 'Unknown'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
export {ProjectList}
