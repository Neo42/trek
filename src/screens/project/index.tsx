import {Link, Route, Routes, Navigate} from 'react-router-dom'
import {KanbansScreen} from '../kanbans'
import {TasksScreen} from '../tasks'

export const ProjectScreen = () => {
  return (
    <div>
      <h1>Project</h1>
      <Link to="kanban">Kanban</Link>
      <Link to="tasks">Tasks</Link>
      <Routes>
        <Route path="kanban" element={<KanbansScreen />} />
        <Route path="tasks" element={<TasksScreen />} />
        <Route path="*" element={<Navigate replace to={`kanban`} />} />
      </Routes>
    </div>
  )
}
