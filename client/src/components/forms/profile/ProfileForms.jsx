import React from 'react'
import cn from 'classnames'

import { useToogle } from '../../../hooks/useToogle'

import ChangeAvatar from './ChangeAvatar'
import ChangeDescriptionForm from './ChangeDescriptionForm'
import ChangePasswordForm from './ChangePasswordForm'

import styles from './profileForms.module.scss'

const ProfileForms = () => {

  const [isPasswordForm, showPasswordForm, showDescriptionForm] = useToogle(false)

  return (
    <div className={styles.profileForms}>
      <ChangeAvatar />

      <div className={cn(styles.formToogler, styles.box)}>
        <button
          className={cn(!isPasswordForm && styles.activeBtn)}
          onClick={showDescriptionForm}>
          Общие данные
        </button>

        <button
          className={cn(isPasswordForm && styles.activeBtn)}
          onClick={showPasswordForm}>
          Поменять пароль
        </button>
      </div>

      {!isPasswordForm
        ? <ChangeDescriptionForm />
        : <ChangePasswordForm />
      }
    </div>
  )
}

export default ProfileForms