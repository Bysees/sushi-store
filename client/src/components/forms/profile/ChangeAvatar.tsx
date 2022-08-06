import { ChangeEvent, FC, useState } from 'react'
import { useTypedDispatch } from '../../../redux/hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import { convertAlt } from '../../../utils/converter'
import {
  isErrorWithMessage,
  isFetchErrorResponse
} from '../../../services/api/helper'
import { useUpdateImgMutation } from '../../../services/api/userApi'
import { setUserAvatar } from '../../../redux/slices/userSlice'

import profileStyles from './profileForms.module.scss'
import formStyles from './../form.module.scss'

interface Props {
  avatar: string | null
}

const ChangeAvatar: FC<Props> = ({ avatar }) => {
  const dispatch = useTypedDispatch()

  const [updateImage, { isLoading }] = useUpdateImgMutation()
  const [serverError, setServerError] = useState('')

  const editImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0]

    if (file) {
      const formData = new FormData()
      formData.append('avatar', file)

      try {
        const newAvatar = await updateImage(formData).unwrap()
        dispatch(setUserAvatar(newAvatar))
      } catch (err) {
        if (isFetchErrorResponse(err)) {
          return setServerError(err.data?.message || 'Server error...')
        }
        if (isErrorWithMessage(err)) {
          return setServerError(err.message)
        }
        throw err
      }
    }
  }

  return (
    <div className={profileStyles.box}>
      <input
        className={profileStyles.inputFile}
        type='file'
        id='imgFile'
        accept='.png,.jpg,.jpeg'
        onChange={editImage}
        disabled={isLoading}
      />
      <label className={profileStyles.labelFile} htmlFor='imgFile' tabIndex={0}>
        <div className={profileStyles.avatar}>
          {avatar ? (
            <img src={avatar} alt={'profile avatar - ' + convertAlt(avatar)} />
          ) : (
            <FontAwesomeIcon
              className={profileStyles.avatar__icon}
              icon={faUser}
            />
          )}
        </div>
        <div className={profileStyles.btnTitle}>Поменять аватар</div>
        {serverError && <span className={formStyles.error}>{serverError}</span>}
      </label>
    </div>
  )
}

export default ChangeAvatar
