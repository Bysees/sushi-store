import { FC, FocusEventHandler, memo } from 'react'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form'

import styles from '../../forms/form.module.scss'

interface Props {
  className: string
  label: string
  register: UseFormRegisterReturn
  error?: FieldError
  placeholder?: string
  onFocus?: () => void
}

const Textarea: FC<Props> = ({
  className,
  label,
  register,
  error,
  placeholder,
  onFocus: onFocusCallback
}) => {
  const onFocusHandler: FocusEventHandler<HTMLTextAreaElement> = (e) => {
    if (onFocusCallback) {
      onFocusCallback()
    }
  }

  return (
    <div className={className}>
      <label>{label}</label>
      <textarea
        {...register}
        placeholder={placeholder}
        onFocus={onFocusHandler}
      />
      {error && <span className={styles.error}>{error.message}</span>}
    </div>
  )
}

export default memo(Textarea)
