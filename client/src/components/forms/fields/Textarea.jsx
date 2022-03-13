import React, { memo } from 'react'
import cn from 'classnames'
import styles from '../../forms/form.module.scss'
import errorHandler from './errorHandler'

const Textarea = ({
  className, name, label, serverError, errors, register, validate = {}, ...rest
}) => {

  const error = errorHandler(errors, name)

  return (
    <div className={cn(className, error && styles.field__error)}>
      <label>{label}</label>
      <textarea {...register(name, validate)} {...rest} />
      {error?.message && <span>{error.message}</span>}
      {serverError && <span>{serverError}</span>}
    </div>
  )
}

export default memo(Textarea)