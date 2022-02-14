import {RateProps, SelectProps, Drawer} from 'antd'
import {Project, User} from 'screens/projects/index.d'

export type ErrorBoundaryProps = React.PropsWithChildren<{
  fallbackRender: ({error}: {error: Error | null}) => React.ReactElement
}>

export interface ErrorBoundaryState {
  error: Error | null
}

export interface GenericSelectProps extends SelectProps {
  value: string | number | null | undefined
  onChange: (value?: Project['principalId']) => void
  defaultOptionName?: string
  options?: {name: string; id: number}[]
}

export interface PinProps extends RateProps {
  checked: boolean
  onChange?: (checked: PinProps['checked']) => void
}

export type ModalState = [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
]

export interface ModalBaseProps
  extends Omit<
    React.ComponentProps<typeof Drawer>,
    'width' | 'visible' | 'onClose' | 'style'
  > {
  style?: Omit<React.ComponentProps<typeof Drawer>['style'], 'zIndex'>
}

export interface ModalProps
  extends Omit<React.ComponentProps<typeof ModalContentBase>, 'title'> {
  title: string
}

export interface PopoverProps {
  title: string
  buttonText: string
  contentTitle: string
  items: Partial<User | Project>[] | undefined
}

export interface PopoverContentProps extends Omit<PopoverProps, 'title'> {}
