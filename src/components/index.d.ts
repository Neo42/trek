export type ErrorBoundaryProps = React.PropsWithChildren<{
  fallbackRender: ({error}: {error: Error | null}) => React.ReactElement
}>

export type ErrorBoundaryState = {error: Error | null}
