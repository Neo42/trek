import * as React from 'react'
import {ErrorBoundaryProps, ErrorBoundaryState} from './index.d'

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: Readonly<ErrorBoundaryState> = {error: null}

  // set the error state right after error is thrown
  static getDerivedStateFromError(error: Error) {
    return {error}
  }

  render(): React.ReactNode {
    const {error} = this.state
    const {fallbackRender, children} = this.props
    if (error) {
      fallbackRender({error})
    }
    return children
  }
}