import * as React from 'react'

export const useHeadTitle = (title: string, keepOnUnmount = true) => {
  const titleRef = React.useRef(title)
  const prevTitle = titleRef.current

  React.useLayoutEffect(() => {
    document.title = title
  }, [title])

  React.useLayoutEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = prevTitle
      }
    }
  }, [keepOnUnmount, prevTitle])
}
