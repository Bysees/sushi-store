import React, { useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import profileStyles from './profileForms.module.scss'
import sake from '../../../images/food/sushi_sake.jpg'


const ChangeAvatar = () => {

  const refImg = useRef(null)
  const hasImg = true

  const onChangeHandler = (e) => {

    const file = e.target.files[0]

    if (file) {
      refImg.current.src = URL.createObjectURL(file)
      refImg.current.onload = () => {
        URL.revokeObjectURL(file)
      }
    }
  }


  return (
    <div className={profileStyles.box}>
      <input className={profileStyles.inputFile}
        type="file"
        id='imgFile'
        accept='image/*'
        onChange={onChangeHandler}
      />
      <label className={profileStyles.labelFile} htmlFor="imgFile" tabIndex={0}>
        <div className={profileStyles.avatar}>
          {hasImg
            ? <img src={sake} alt="avatar" ref={refImg} />
            : <FontAwesomeIcon className={profileStyles.avatar__icon} icon={faUser} />
          }
        </div>
        <div className={profileStyles.btnTitle}>Поменять аватар</div>
      </label>
    </div>
  )
}

export default ChangeAvatar