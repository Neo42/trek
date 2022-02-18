import {Task} from 'types'

export const TaskSearchHighlight = ({
  name,
  keyword,
}: {
  name: Task['name']
  keyword: string
}) => {
  if (!keyword) {
    return <>{name}</>
  }
  const words = name.split(keyword)
  return (
    <>
      {words.map((word, index) => (
        <span key={index}>
          {word}
          {index !== words.length - 1 ? (
            <span style={{color: '#257AFD'}}>{keyword}</span>
          ) : null}
        </span>
      ))}
    </>
  )
}
