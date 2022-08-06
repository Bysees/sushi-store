import { FC, FocusEventHandler, memo } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface Props {
  className: string
  label: string
  values: { value: string; title?: string }[]
  register: UseFormRegisterReturn
  multiple?: boolean
  size?: number
  onFocus?: () => void
}

const Select: FC<Props> = ({
  className,
  label,
  values,
  register,
  multiple,
  size,
  onFocus: onFocusCallback
}) => {
  const onFocusHandler: FocusEventHandler<HTMLSelectElement> = () => {
    if (onFocusCallback) {
      onFocusCallback()
    }
  }

  return (
    <div className={className}>
      <label>{label}</label>
      <select
        {...register}
        multiple={multiple}
        size={size}
        onFocus={onFocusHandler}>
        {values.map(({ value, title }) => (
          <option key={value} value={value}>
            {title ? title : value}
          </option>
        ))}
      </select>
    </div>
  )
}

export default memo(Select)
