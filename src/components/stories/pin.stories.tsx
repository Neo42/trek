import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'
import {Pin} from 'components/pin'

export default {
  title: 'Pin',
  component: Pin,
} as ComponentMeta<typeof Pin>

export const Default: ComponentStory<typeof Pin> = () => {
  const [checked, setChecked] = React.useState(false)
  return <Pin checked={checked} onChange={() => setChecked(!checked)} />
}
