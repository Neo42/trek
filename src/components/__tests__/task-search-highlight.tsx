import {render, screen} from '@testing-library/react'
import {TaskSearchHighlight} from '../task-search-highlight'

test('should highlight keyword correctly', () => {
  const name = 'Group Buying'
  const keyword = 'Buying'

  render(<TaskSearchHighlight name={name} keyword={keyword} />)
  expect(screen.getByText(keyword)).toBeInTheDocument()
  expect(screen.getByText(keyword)).toHaveStyle('color: #257AFD')
  expect(screen.getByText('Group')).not.toHaveStyle('color: #257AFD')
})
