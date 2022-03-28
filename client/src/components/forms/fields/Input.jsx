import React, { memo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import cn from 'classnames'
import errorHandler from './errorHandler'
import styles from '../../forms/form.module.scss'

const Input = ({
  className, name, label, serverError, errors, register, validate = {}, type, ...rest }) => {

  const error = errorHandler(errors, name)

  const [inputType, setInputType] = useState(type)

  const showPassword = () => setInputType('text')
  const hidePassword = () => setInputType('password')
  const isInputPassword = inputType === 'password'
  const passwordTypeHandler = isInputPassword ? showPassword : hidePassword
  const icon = isInputPassword ? faEye : faEyeSlash

  return (
    <div className={cn(className, error && styles.field__error)}>
      <label>{label}</label>
      <div>
        <input {...register(name, validate)} type={inputType} {...rest} />
        {type === 'password' &&
          <button type='button' onClick={passwordTypeHandler}>
            <FontAwesomeIcon icon={icon} />
          </button>
        }
      </div>
      {error && <span className={styles.error}>{error.message}</span>}
      {serverError && <span className={styles.error}>{serverError}</span>}
    </div>
  )
}



export default memo(Input)