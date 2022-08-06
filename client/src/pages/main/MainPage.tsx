import { Link } from 'react-router-dom'

import Container from '../../components/common/Container'
import ProductSlide from '../../components/products/ProductSlide'
import Slider from '../../components/slider/Slider'

import { Paths } from '../../routes/links'
import { useGetAllProductsQuery } from '../../services/api/productApi'

import appStyles from '../../styles/app.module.scss'
import styles from './mainPage.module.scss'

const MainPage = () => {
  const { data: initialProducts = [], isSuccess } = useGetAllProductsQuery()

  return (
    <div className={appStyles.main}>
      <Container>
        <div className={styles.wrapper}>
          {isSuccess && (
            <Slider
              width={1000}
              slides={2}
              renderSlides={(width) =>
                initialProducts.map(({ items, category }) => {
                  return items
                    .map(({ id, img, labels, structure }) => (
                      <ProductSlide
                        key={id}
                        id={id}
                        img={img}
                        labels={labels}
                        structure={structure}
                        width={width}
                        category={category.eng}
                      />
                    ))
                    .reverse()
                })
              }
            />
          )}

          <div className={styles.description}>
            <h3 className={styles.title}>Первые суши в мире</h3>
            <p className={styles.text}>
              <span>История</span> возникновения суши берёт начало в Южной Азии,
              где варёный рис стали применять для приготовления и консервации
              рыбы. Очищенная и разрезанная на небольшие кусочки рыба посыпалась
              солью и смешивалась с рисом, после чего помещалась под пресс из
              камней, который через несколько недель заменялся крышкой. В
              течение нескольких месяцев происходил процесс молочнокислой
              ферментации риса и рыбы, благодаря чему рыба оставалась годной к
              употреблению в течение года. Рис, который превращался в
              клееобразную массу с неприятным запахом, выбрасывался или
              использовался для приготовления новой партии рыбы. Приблизительно
              в VII веке через Китай и Таиланд этот способ консервации получил
              распространение в Японии.
            </p>
          </div>

          <div className={styles.linkWrap}>
            <Link to={Paths.menu} className={styles.link}>
              Перейти в меню
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default MainPage
