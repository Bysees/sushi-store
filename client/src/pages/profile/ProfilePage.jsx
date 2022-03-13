import React from 'react'
// import cn from 'classnames'

import Container from '../../components/common/Container'
import ProfileForms from '../../components/forms/profile/ProfileForms'

import styles from './profilePage.module.scss'
import appStyles from '../../styles/app.module.scss'

const ProfilePage = () => {

  const username = 'Васил'
  const description = 'Я нормальный парень, но бывает едет крыша'

  return (
    <div className={appStyles.profile}>
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.profile}>

            <div className={styles.profile__info}>
              <div className={styles.username}>
                {username}
              </div>
              <div className={styles.description}>
                {description}
              </div>
            </div>

            <div className={styles.profile__forms}>
              <ProfileForms />
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default ProfilePage