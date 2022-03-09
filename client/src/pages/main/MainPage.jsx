import React from 'react'
import { NavLink } from 'react-router-dom'

import Container from '../../components/common/Container'
import Slider from '../../components/slider/Slider'

import appStyles from '../../styles/app.module.scss'
import styles from './mainPage.module.scss'

const MainPage = () => {

  return (
    <div className={appStyles.main}>
      <Container>
        <div className={styles.wrapper}>
          <Slider />

          {/* //TODO: Декомпозировать */}
          <div className={styles.description}>
            <h3 className={styles.title}>Первые суши в мире</h3>
            <p className={styles.text}>
              <span>История</span> возникновения суши берёт начало в Южной Азии, где варёный рис стали применять для приготовления и консервации рыбы. Очищенная и разрезанная на небольшие кусочки рыба посыпалась солью и смешивалась с рисом, после чего помещалась под пресс из камней, который через несколько недель заменялся крышкой. В течение нескольких месяцев происходил процесс молочнокислой ферментации риса и рыбы, благодаря чему рыба оставалась годной к употреблению в течение года. Рис, который превращался в клееобразную массу с неприятным запахом, выбрасывался или использовался для приготовления новой партии рыбы. Приблизительно в VII веке через Китай и Таиланд этот способ консервации получил распространение в Японии.
            </p>
          </div>

          {/* //TODO: Декомпозировать */}
          <div className={styles.linkWrap}>
            <NavLink to={'/menu'} className={styles.link}>
              Перейти в меню
            </NavLink>
          </div>

        </div>
      </Container>
    </div>
  )
}


export default MainPage