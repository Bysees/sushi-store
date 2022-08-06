import { useTypedSelector } from '../../redux/hooks'

import Container from '../../components/common/Container'
import ProfileForms from '../../components/forms/profile/ProfileForms'

import styles from './profilePage.module.scss'
import appStyles from '../../styles/app.module.scss'

const ProfilePage = () => {
  const { avatar, description, login, name, role } = useTypedSelector(
    (state) => state.user
  )

  if (!login || !role) {
    return <h1>Доступ запрещён</h1>
  }

  return (
    <div className={appStyles.profile}>
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.profile}>
            <div className={styles.profile__info}>
              <div className={styles.username}>{name}</div>
              <div className={styles.description}>{description}</div>
            </div>

            <div className={styles.profile__forms}>
              <ProfileForms
                login={login}
                role={role}
                avatar={avatar}
                description={description}
                name={name}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default ProfilePage
