import { FC } from 'react'
import cn from 'classnames'

import { useToogle } from '../../../hooks/useToogle'
import { IUser } from '../../../models/user'

import ChangeAvatar from './ChangeAvatar'
import ChangeDescriptionForm from './ChangeDescriptionForm'
import ChangePasswordForm from './ChangePasswordForm'

import styles from './profileForms.module.scss'

interface Props extends IUser {
  login: string
  role: string
}

const ProfileForms: FC<Props> = ({ avatar, description, login, name, role }) => {

  const [isPasswordForm, showPasswordForm, showDescriptionForm] = useToogle(false)

  return (
    <div className={styles.profileForms}>
      <ChangeAvatar avatar={avatar} />

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
        ? <ChangeDescriptionForm description={description} name={name} />
        : <ChangePasswordForm login={login} role={role} />
      }
    </div>
  )
}

export default ProfileForms