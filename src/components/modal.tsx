import * as React from 'react'
import {Drawer} from 'antd'
import {ModalState, ModalProps, ModalBaseProps} from './index.d'

const callAll =
  (...fns: ((...args: unknown[]) => void)[]) =>
  (...args: unknown[]) =>
    fns.forEach((fn) => fn && fn?.(...args))

const ModalContext = React.createContext<ModalState | undefined>(undefined)

export const ModalProvider = ({
  children,
  modalState,
}: {
  children: React.ReactNode
  modalState: undefined | ModalState
}) => {
  ModalContext.displayName = modalState?.name
  return <ModalContext.Provider value={modalState} children={children} />
}

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
  const {closeModal} = React.useContext(ModalContext) as ModalState
  return React.cloneElement(child, {
    onClick: callAll(closeModal, child.props.onClick),
  })
}

export const ModalOpenButton = ({
  children: child,
}: {
  children: React.ReactElement
}) => {
  if (!React.useContext(ModalContext)) {
    throw new Error('The ModalOpenButton must be used within a ModalProvider.')
  }
  const {openModal} = React.useContext(ModalContext) as ModalState
  return React.cloneElement(child, {
    onClick: callAll(openModal, child.props.onClick),
  })
}

export const ModalBase = (props: ModalBaseProps) => {
  if (!React.useContext(ModalContext)) {
    throw new Error('The ModalBase must be used within a ModalProvider.')
  }
  const {isModalOpen, closeModal} = React.useContext(ModalContext) as ModalState
  return (
    <Drawer
      getContainer={false} // add this to fix missing prop warning by antd
      forceRender // this also works
      width="100%"
      visible={isModalOpen}
      onClose={closeModal}
      {...props}
    />
  )
}

export const Modal = ({children, ...props}: ModalProps) => (
  <ModalBase {...props}>{children}</ModalBase>
)
