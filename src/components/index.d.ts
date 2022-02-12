import {SelectProps} from 'antd'

export type ErrorBoundaryProps = React.PropsWithChildren<{
  fallbackRender: ({error}: {error: Error | null}) => React.ReactElement
}>

export type ErrorBoundaryState = {error: Error | null}

type RawValue = string | number

export interface GenericSelectProps extends SelectProps {
  value: RawValue | null | undefined
  onChange: (value?: number | undefined) => void
  defaultOptionName?: string
  options?: {name: string; id: number}[]
}
