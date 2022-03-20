import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import { useImgPreview } from '../../../hooks/useImgPreview'

import profileStyles from './profileForms.module.scss'

const ChangeAvatar = () => {

  const { src, previewImageHandler } = useImgPreview(null)

  return (
    <div className={profileStyles.box}>
      <input className={profileStyles.inputFile}
        type="file"
        id='imgFile'
        accept='image/*'
        onChange={previewImageHandler}
      />
      <label className={profileStyles.labelFile} htmlFor="imgFile" tabIndex={0}>
        <div className={profileStyles.avatar}>
          {src
            ? <img src={src} alt="avatar" />
            : <FontAwesomeIcon className={profileStyles.avatar__icon} icon={faUser} />
          }
        </div>
        <div className={profileStyles.btnTitle}>Поменять аватар</div>
      </label>
    </div>
  )
}

export default ChangeAvatar