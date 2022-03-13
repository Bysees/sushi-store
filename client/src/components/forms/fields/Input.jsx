import React, { memo } from 'react'
import cn from 'classnames'
import styles from '../../forms/form.module.scss'
import errorHandler from './errorHandler'

const Input = ({
  className, name, label, serverError, errors, register, validate = {}, ...rest }) => {

  const error = errorHandler(errors, name)

  return (
    <div className={cn(className, error && styles.field__error)}>
      <label>{label}</label>
      <input {...register(name, validate)} {...rest} />
      {error && <span>{error.message}</span>}
      {serverError && <span>{serverError}</span>}
    </div>
  )
}



export default memo(Input)