import React from 'react'
import Container from '../common/Container'
import styles from './footer.module.scss'
import appStyles from '../../styles/app.module.scss'

const Footer = () => {
  return (
    <footer className={appStyles.footer}>
      <Container>
        <div className={styles.description}>
          <p>
            Данный сайт не является официальной торговой площадкой
          </p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer