import React, { memo } from 'react'
import cn from 'classnames'
import errorHandler from './errorHandler'
import styles from '../../forms/form.module.scss'

const Input = ({
  className, name, label, serverError, errors, register, validate = {}, ...rest }) => {

  const error = errorHandler(errors, name)

  return (
    <div className={cn(className, error && styles.field__error)}>
      <label>{label}</label>
      <input {...register(name, validate)} {...rest} />
      {error && <span className={styles.error}>{error.message}</span>}
      {serverError && <span className={styles.error}>{serverError}</span>}
    </div>
  )
}



export default memo(Input)