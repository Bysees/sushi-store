import React from 'react'
import { useSelector } from 'react-redux'

import Container from '../../components/common/Container'
import ProfileForms from '../../components/forms/profile/ProfileForms'

import styles from './profilePage.module.scss'
import appStyles from '../../styles/app.module.scss'


const ProfilePage = () => {

  const { name, description } = useSelector(state => {
    return {
      name: state.user.name,
      description: state.user.description
    }
  })

  return (
    <div className={appStyles.profile}>
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.profile}>

            <div className={styles.profile__info}>
              <div className={styles.username}>
                {name}
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