import {Select} from 'antd'
import {GenericSelectProps} from './index.d'

export const GenericSelect = ({
  value,
  onChange,
  defaultOptionName,
  options,
  placeholder,
  ...props
}: GenericSelectProps) => {
  return (
    <Select
      placeholder={placeholder}
      value={options?.length ? getValue(value) : 0}
      onChange={(value: GenericSelectProps['value']) =>
        onChange?.(getValue(value))
      }
      {...props}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map(({id, name}) => (
        <Select.Option key={id} value={id}>
          {name}
        </Select.Option>
      ))}
    </Select>
  )
}

const getValue = (value: GenericSelectProps['value']) =>
  isNaN(Number(value)) ? 0 : Number(value)
