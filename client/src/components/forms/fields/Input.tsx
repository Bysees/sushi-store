import { FC, FocusEventHandler, KeyboardEventHandler, memo } from 'react'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form'

import styles from '../../forms/form.module.scss'

interface Props {
  className: string
  label: string
  register: UseFormRegisterReturn
  error?: FieldError
  type?: string
  placeholder?: string
  disabled?: boolean
  onFocus?: () => void
}

const Input: FC<Props> = ({
  className,
  label,
  type,
  placeholder,
  register,
  error,
  disabled,
  children,
  onFocus: onFocusCallback
}) => {
  const acceptOnlyNumbers: KeyboardEventHandler<HTMLInputElement> = (e) => {
    const operators = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight']
    const isNumber = operators.includes(e.code)
      ? true
      : !isNaN(Number(e.key)) && e.code !== 'Space'
    if (!isNumber) {
      e.preventDefault()
    }
  }

  const select: FocusEventHandler<HTMLInputElement> = (e) => {
    if (e.target.value === '0') {
      e.target.type = 'text'
      e.target.setSelectionRange(0, e.target.value.length)
      e.target.type = 'number'
    }
  }

  const onFocusHandler: FocusEventHandler<HTMLInputElement> = (e) => {
    if (type === 'number') {
      select(e)
    }
    if (onFocusCallback) {
      onFocusCallback()
    }
  }

  const onKeyPressHandler: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (type === 'number') {
      acceptOnlyNumbers(e)
    }
  }

  return (
    <div className={className}>
      <label>{label}</label>
      <div>
        <input
          {...register}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={onFocusHandler}
          onKeyPress={onKeyPressHandler}
        />
        {children}
      </div>
      {error && <span className={styles.error}>{error.message}</span>}
    </div>
  )
}

export default memo(Input)
