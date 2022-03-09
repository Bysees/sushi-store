import React, { Fragment, useState } from 'react'
import cn from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import Container from '../../components/common/Container'

import styles from './profilePage.module.scss'
import appStyles from '../../styles/app.module.scss'

const ProfilePage = () => {

  const [isPasswordForm, toogleProfile] = useState(false)

  const login = 'User_12345'
  const username = 'Васил'
  const description = 'Я нормальный парень, но бывает едет крыша'

  return (
    <div className={appStyles.profile}>
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.profile}>

            <div className={styles.profile__login}>{username}</div>
            <div className={styles.profile__description}>{description}</div>

            <form
              autoComplete='off'
              className={cn(
                styles.form,
                isPasswordForm && styles.form_passwordChange
              )}
              onSubmit={e => {
                e.preventDefault()
                console.log('tuta')
              }}
            >

              <div className={styles.imgFile}>
                <label htmlFor="imgFile" tabIndex={0}>
                  <FontAwesomeIcon className={styles.imgFile__icon} icon={faUser} />
                  <span>Поменять аватар</span>
                </label>
                <input type="file" name="imgFile" id="imgFile" />
              </div>

              <div className={styles.toogleForm}>
                <button type='button'
                  className={cn(
                    styles.toogleForm__commonData,
                    !isPasswordForm && styles.toogleForm__commonData__active
                  )}
                  onClick={() => toogleProfile(false)}>
                  Общие данные
                </button>
                <button type='button'
                  className={cn(
                    styles.toogleForm__password,
                    isPasswordForm && styles.toogleForm__commonData__active
                  )}
                  onClick={() => toogleProfile(true)}>
                  Поменять пароль
                </button>
              </div>

              {!isPasswordForm
                ? <Fragment>
                  <div className={styles.username}>
                    <label htmlFor="username">Ваше имя: </label>
                    <input type="text" name='username' id='username' key='username' />
                  </div>
                  <div className={styles.description}>
                    <label htmlFor="description">О себе: </label>
                    <textarea type="text" name='descriotion' id='description' />
                  </div>
                </Fragment>

                : <Fragment>
                  <div className={styles.login}>
                    <label htmlFor="login">Логин: </label>
                    <input type="text" name='login' id='login' disabled defaultValue={login} key='login' />
                  </div>
                  <div className={styles.password}>
                    <label htmlFor="password">Новый пароль: </label>
                    <input type="password" name='password' id='password' />
                  </div>
                  <div className={styles.password_repeat}>
                    <label htmlFor="password_repeat">Повторите пароль: </label>
                    <input type="password" name='password_repeat' id='password_repeat' />
                  </div>
                </Fragment>
              }

              <div className={styles.save}>
                <button>Cохранить изменения</button>
              </div>

            </form>

          </div>
        </div>
      </Container>
    </div>
  )
}

export default ProfilePage