import {TableProps, SelectProps, Drawer, RateProps} from 'antd'
import {Project, User} from './data'
import {AuthForm} from './auth'
import {ModalBase} from 'components'

export type ErrorBoundaryProps = React.PropsWithChildren<{
  fallbackRender: ({error}: {error: Error | null}) => React.ReactElement
}>

export interface ErrorBoundaryState {
  error: Error | null
}

export interface GenericSelectProps
  extends Omit<
    SelectProps,
    'value' | 'onChange' | 'defaultOptionName' | 'options'
  > {
  value?: string | number | null | undefined
  onChange?: (value?: Project['ownerId']) => void
  defaultOptionName?: string
  options?: {name: string; id: number}[]
}

export interface PinProps extends Omit<RateProps, 'checked' | 'onChange'> {
  checked?: boolean
  onChange?: (checked: PinProps['checked']) => void
}

export type ModalState = {
  readonly name: string
  readonly isModalOpen: boolean
  readonly openModal: () => void
  readonly closeModal: () => void
}

export type ModalBaseProps = Omit<
  React.ComponentProps<typeof Drawer>,
  'width' | 'visible' | 'onClose'
>

export type ModalProps = React.ComponentProps<typeof ModalBase>

export interface PopoverProps {
  title: string
  buttonText?: string
  contentTitle: string
  items: Partial<User | Project>[] | undefined
}

export interface PopoverContentProps extends Omit<PopoverProps, 'title'> {}

export interface ProjectListProps extends TableProps<Project> {
  users: User[]
}

export interface ProjectSearchProps {
  params: Partial<Pick<Project, 'name' | 'ownerId'>>
  setParams: (params: ProjectSearchProps['params']) => void
}

export interface UserFormProps {
  title: 'Login' | 'Create Account'
  onSubmit: (form: AuthForm) => Promise<void>
  onError: (error: any) => void
}
