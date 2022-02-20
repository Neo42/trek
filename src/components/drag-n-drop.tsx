import * as React from 'react'
import {
  Droppable as DndDroppable,
  Draggable as DndDraggable,
  DroppableProps as DndDroppableProps,
  DraggableProps as DndDraggableProps,
  DroppableProvided,
  DroppableProvidedProps,
} from 'react-beautiful-dnd'

type DroppableProps = Omit<DndDroppableProps, 'children'> & {
  children: React.ReactNode
}

export const Droppable = ({children, ...props}: DroppableProps) => {
  return (
    <DndDroppable {...props}>
      {(provided) => {
        return React.isValidElement(children) ? (
          React.cloneElement(children, {
            ...provided.droppableProps,
            ref: provided.innerRef,
            provided,
          })
        ) : (
          <div />
        )
      }}
    </DndDroppable>
  )
}

type DroppableChildrenProps = Partial<
  DroppableProvidedProps & {
    provided: DroppableProvided
  }
> &
  React.HTMLAttributes<HTMLElement>

export const DroppableChildren = React.forwardRef<
  HTMLDivElement,
  DroppableChildrenProps
>(({children, provided, ...props}, ref) => (
  <div ref={ref} {...props}>
    {children}
    {provided?.placeholder}
  </div>
))

type DraggableProps = Omit<DndDraggableProps, 'children'> & {
  children: React.ReactNode
}

export const Draggable = ({children, ...props}: DraggableProps) => {
  return (
    <DndDraggable {...props}>
      {(provided) => {
        return React.isValidElement(children) ? (
          React.cloneElement(children, {
            ...provided.draggableProps,
            ...provided.dragHandleProps,
            ref: provided.innerRef,
          })
        ) : (
          <div />
        )
      }}
    </DndDraggable>
  )
}
