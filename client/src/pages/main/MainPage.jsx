import React from 'react'
import { Link } from 'react-router-dom'

import Container from '../../components/common/Container'
import ProductSlide from '../../components/products/ProductSlide'
import Slider from '../../components/slider/Slider'

import { useGetAllProductsQuery } from '../../redux/RTKquery/product'

import appStyles from '../../styles/app.module.scss'
import styles from './mainPage.module.scss'


const MainPage = () => {

  const { data: products, isLoading } = useGetAllProductsQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className={appStyles.main}>
      <Container>
        <div className={styles.wrapper}>

          <Slider
            renderSlides={(width) => (
              products.map(({ img, id, labels, structure }) => (
                <ProductSlide
                  key={id}
                  id={id}
                  img={img}
                  labels={labels}
                  structure={structure}
                  width={width}
                />)
              ))}
          />

          <div className={styles.description}>
            <h3 className={styles.title}>Первые суши в мире</h3>
            <p className={styles.text}>
              <span>История</span> возникновения суши берёт начало в Южной Азии, где варёный рис стали применять для приготовления и консервации рыбы. Очищенная и разрезанная на небольшие кусочки рыба посыпалась солью и смешивалась с рисом, после чего помещалась под пресс из камней, который через несколько недель заменялся крышкой. В течение нескольких месяцев происходил процесс молочнокислой ферментации риса и рыбы, благодаря чему рыба оставалась годной к употреблению в течение года. Рис, который превращался в клееобразную массу с неприятным запахом, выбрасывался или использовался для приготовления новой партии рыбы. Приблизительно в VII веке через Китай и Таиланд этот способ консервации получил распространение в Японии.
            </p>
          </div>

          <div className={styles.linkWrap}>
            <Link to={'/menu/sushi'} className={styles.link}>
              Перейти в меню
            </Link>
          </div>

        </div>
      </Container>
    </div>
  )
}


export default MainPage