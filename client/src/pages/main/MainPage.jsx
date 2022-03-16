import React from 'react'
import { NavLink } from 'react-router-dom'

import Container from '../../components/common/Container'
import ProductSlide from '../../components/products/ProductSlide'
import Slider from '../../components/slider/Slider'

import appStyles from '../../styles/app.module.scss'
import styles from './mainPage.module.scss'

import cheesy from '../../images/food/cheesy_baked.jpg'
import spicy from '../../images/food/spicy_baked.jpg'
import chukka from '../../images/food/sushi_chukka1.jpg'
import ebi from '../../images/food/sushi_ebi.jpg'
import sake from '../../images/food/sushi_sake.jpg'
import salmo from '../../images/food/sushi_spicy_salmon.jpg'
import shrimp from '../../images/food/sushi_spicy_shrimp1.jpg'
import unagi from '../../images/food/sushi_unagi.jpg'

export const productItems = [
  cheesy, spicy, chukka, ebi, sake, salmo, shrimp, unagi
]

const MainPage = () => {

  return (
    <div className={appStyles.main}>
      <Container>
        <div className={styles.wrapper}>

          <Slider
            renderSlides={(width) => (
              productItems.map(img => (
                <ProductSlide key={img} img={img} width={width} />)
              ))}
          />

          <div className={styles.description}>
            <h3 className={styles.title}>Первые суши в мире</h3>
            <p className={styles.text}>
              <span>История</span> возникновения суши берёт начало в Южной Азии, где варёный рис стали применять для приготовления и консервации рыбы. Очищенная и разрезанная на небольшие кусочки рыба посыпалась солью и смешивалась с рисом, после чего помещалась под пресс из камней, который через несколько недель заменялся крышкой. В течение нескольких месяцев происходил процесс молочнокислой ферментации риса и рыбы, благодаря чему рыба оставалась годной к употреблению в течение года. Рис, который превращался в клееобразную массу с неприятным запахом, выбрасывался или использовался для приготовления новой партии рыбы. Приблизительно в VII веке через Китай и Таиланд этот способ консервации получил распространение в Японии.
            </p>
          </div>

          <div className={styles.linkWrap}>
            <NavLink to={'/menu/sushi'} className={styles.link}>
              Перейти в меню
            </NavLink>
          </div>

        </div>
      </Container>
    </div>
  )
}


export default MainPage