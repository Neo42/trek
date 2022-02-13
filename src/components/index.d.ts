import {RateProps, SelectProps} from 'antd'
import {Project} from 'screens/projects/index.d'

export type ErrorBoundaryProps = React.PropsWithChildren<{
  fallbackRender: ({error}: {error: Error | null}) => React.ReactElement
}>

export interface ErrorBoundaryState {
  error: Error | null
}

type RawValue = string | number

export interface GenericSelectProps extends SelectProps {
  value: RawValue | null | undefined
  onChange: (value?: Project['principalId']) => void
  defaultOptionName?: string
  options?: {name: string; id: number}[]
}

export interface PinProps extends RateProps {
  checked: boolean
  onChange?: (checked: PinProps['checked']) => void
}
