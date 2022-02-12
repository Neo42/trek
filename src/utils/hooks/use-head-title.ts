import * as React from 'react'

export const useHeadTitle = (title: string, keepOnUnmount = true) => {
  const prevTitle = document.title

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
