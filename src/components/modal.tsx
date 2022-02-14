import * as React from 'react'
import {Drawer} from 'antd'
import {ModalState, ModalProps, ModalBaseProps} from './index.d'

const callAll =
  (...fns: ((...args: unknown[]) => void)[]) =>
  (...args: unknown[]) =>
    fns.forEach((fn) => fn && fn?.(...args))

const ModalContext = React.createContext<ModalState | undefined>(undefined)

export const ModalProvider = (
  props: Omit<React.ComponentProps<typeof ModalContext.Provider>, 'value'>,
) => <ModalContext.Provider value={React.useState<boolean>(false)} {...props} />

export const ModalDismissButton = ({
  children: child,
}: {
  children: React.ReactElement<any, 'button'>
}) => {
  if (!React.useContext(ModalContext)) {
    throw new Error(
      'The ModalDismissButton must be used within a ModalProvider.',
    )
  }
  const [, setIsOpen] = React.useContext(ModalContext) as ModalState
  return React.cloneElement(child, {
    onClick: callAll(() => setIsOpen(false), child.props.onClick),
  })
}

export const ModalOpenButton = ({
  children: child,
}: {
  children: React.ReactElement<any, 'button'>
}) => {
  if (!React.useContext(ModalContext)) {
    throw new Error('The ModalOpenButton must be used within a ModalProvider.')
  }
  const [, setIsOpen] = React.useContext(ModalContext) as ModalState
  return React.cloneElement(child, {
    onClick: callAll(() => setIsOpen(true), child.props.onClick),
  })
}

export const ModalBase = ({style, ...props}: ModalBaseProps) => {
  if (!React.useContext(ModalContext)) {
    throw new Error('The ModalBase must be used within a ModalProvider.')
  }
  const [isOpen, setIsOpen] = React.useContext(ModalContext) as ModalState
  return (
    <Drawer
      width="100%"
      visible={isOpen}
      onClose={() => setIsOpen(false)}
      style={{...style, zIndex: 99999}}
      {...props}
    />
  )
}

export const Modal = ({title, children, ...props}: ModalProps) => (
  <ModalBase {...props}>
    <h1>{title}</h1>
    {children}
  </ModalBase>
)
