import {Rate} from 'antd'
import {PinProps} from './index.d'

export const Pin = ({checked, onChange, ...props}: PinProps) => {
  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      onChange={(value: number) => onChange?.(Boolean(value))}
      {...props}
    />
  )
}
