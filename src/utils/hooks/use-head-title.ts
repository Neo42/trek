import * as React from 'react'

export const useHeadTitle = (title: string, keepOnUnmount = true) => {
  const titleRef = React.useRef(title)

  React.useLayoutEffect(() => {
    document.title = titleRef.current
  }, [])

  React.useLayoutEffect(() => {
    const prevTitle = titleRef.current
    return () => {
      if (!keepOnUnmount) {
        document.title = prevTitle
      }
    }
  }, [keepOnUnmount])
}
