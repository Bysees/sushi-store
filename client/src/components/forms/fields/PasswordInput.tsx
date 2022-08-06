import { FC, memo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form'

import Input from './Input'

interface Props {
  className: string
  label: string
  register: UseFormRegisterReturn
  error: FieldError | undefined
  placeholder?: string
  onFocus?: () => void
}

const PasswordInput: FC<Props> = (props) => {
  const [type, setType] = useState<'password' | 'text'>('password')
  const isPasswordType = type === 'password'

  const showPassword = () => setType('text')
  const hidePassword = () => setType('password')

  const icon = isPasswordType ? faEye : faEyeSlash
  const onClickHandler = isPasswordType ? showPassword : hidePassword

  const inputProps = { ...props, type }

  return (
    <Input {...inputProps}>
      <button type='button' onClick={onClickHandler}>
        <FontAwesomeIcon icon={icon} />
      </button>
    </Input>
  )
}

export default memo(PasswordInput)
