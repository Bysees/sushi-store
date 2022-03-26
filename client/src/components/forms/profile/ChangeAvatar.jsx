import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import { useUpdateImgMutation } from '../../../redux/RTKquery/user'
import { useImgPreview } from '../../../hooks/useImgPreview'
import { setUserAvatar } from '../../../redux/user'

import profileStyles from './profileForms.module.scss'
import formStyles from './../form.module.scss'

const ChangeAvatar = () => {

  const dispatch = useDispatch()
  const avatar = useSelector(state => state.user.avatar)
  const { previewImg, previewImageHandler } = useImgPreview()

  const avatarImg = previewImg ? previewImg : avatar

  const [updateImage, { isLoading, error: serverError }] = useUpdateImgMutation()

  const editImage = async (event) => {

    const file = event.target.files[0]
    if (file) {

      const formData = new FormData()
      formData.append('avatar', file)

      const response = await updateImage(formData)
      if (!response.error) {
        previewImageHandler(event)
        const newAvatar = response.data
        dispatch(setUserAvatar(newAvatar))
      }
    }
  }

  return (
    <div className={profileStyles.box}>
      <input className={profileStyles.inputFile}
        type="file"
        id='imgFile'
        accept='.png,.jpg,.jpeg'
        onChange={editImage}
        disabled={isLoading}

      />
      <label className={profileStyles.labelFile} htmlFor="imgFile" tabIndex={0}>
        <div className={profileStyles.avatar}>
          {avatarImg
            ? <img src={avatarImg} alt="avatar" />
            : <FontAwesomeIcon className={profileStyles.avatar__icon} icon={faUser} />
          }
        </div>
        <div className={profileStyles.btnTitle}>Поменять аватар</div>
        {serverError && <span className={formStyles.error}>
          {serverError.data.message}
        </span>}
      </label>
    </div>
  )
}

export default ChangeAvatar