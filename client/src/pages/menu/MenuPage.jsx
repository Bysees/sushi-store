import cn from 'classnames'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowTurnRight, faCirclePlus } from '@fortawesome/free-solid-svg-icons'

import Container from '../../components/common/Container'
import CreateProductForm from '../../components/forms/product/CreateProductForm'
import EditProductForm from '../../components/forms/product/EditProductForm'

import { productItems } from '../../components/products/Products'
import image from '../../images/food/sushi_sake.jpg'

import styles from './menuPage.module.scss'
import appStyles from '../../styles/app.module.scss'



const sake = {
  id: "c5e8f345",
  img: image,
  labels: ['new'],
  price: 420,
  structure: {
    calorie: 505,
    carbohydrates: 47,
    fat: 29,
    ingredients: ['угорь', 'авокадо', 'рис', 'сливочный сыр', 'водоросли нори', 'огурец', 'омлет тамаго', 'соус унаги', 'кунжут'],
    protein: 15,
    weight: 230,
  },
  title: "РОЛЛ С УГРЁМ И АВОКАДО"
}

const products = productItems.map(img => ({ ...sake, img: img }))
const filterTitles = ['все', 'острое', 'новинка', 'веган', 'хит']

const MenuPage = () => {

  return (
    <div className={cn(appStyles.menu, styles.wrapper)}>

      <Container>
        <div className={styles.filteringProduct}>
          <div className={styles.filteringProduct__item}>
            <button>Суши</button>
          </div>
          <div className={styles.filteringProduct__item}>
            <button>Ролы</button>
          </div>
        </div>
      </Container>

      <Filters />
      <Container>
        <ProductsMenu />
      </Container>
    </div>
  )
}

const Filters = () => {

  return (
    <div className={styles.filters}>

      {filterTitles.map((title, i) => {
        return (
          <div key={title} className={cn(styles.filter, i === 0 && styles.filter_active, i === 1 && styles.filter_hover)}>
            <button>
              <div className={styles.filter__title}>{title}</div>
              <div className={styles.filter__label_vegan}></div>
              {/* <div className={styles.filter__label_hot}></div> */}
              {/* <div className={styles.filter__label_hit}></div> */}
              {/* <div className={styles.filter__label_new}></div> */}
            </button>
          </div>
        )
      })}

    </div>
  )
}

const ProductsMenu = () => {

  const [isShowDescription, showDescription] = useState(true)
  const [isShowImg, showImg] = useState(false)

  const showDescriptionHideImg = () => {
    showDescription(true)
    showImg(false)
  }

  const showImgHideDescription = () => {
    showImg(true)
    showDescription(false)
  }

  const [isShowCreateProductForm, showCreateProductForm] = useState(false)
  const [isShowEditProductForm, showEditProductForm] = useState(false)

  return (
    <div className={styles.products}>

      {isShowCreateProductForm && <CreateProductForm onHide={() => showCreateProductForm(false)} />}
      {isShowEditProductForm && <EditProductForm onHide={() => showEditProductForm(false)} />}

      {products.map((product, index) => {

        return (
          <div className={styles.product} key={index}>

            {/* //! Image-block: START */}
            <div className={cn(
              styles.imgWrap,
              isShowDescription && styles.imgWrap_showDescription,
              isShowImg && styles.imgWrap_showImg,
            )}>
              <img
                className={styles.img} src={product.img} alt="sushi"
              />

              {index === 1 &&
                <div className={styles.ordered}>
                  <div className={styles.ordered__icon}></div>
                  <div className={styles.ordered__title}>
                    Добавлен 1 набор
                  </div>
                </div>
              }

              {/* <div className={styles.hint} onClick={showDescriptionHideImg}>
                <div className={styles.hint__icon}></div>
                <div className={styles.hint__title}>
                  Посмотреть состав
                </div>
              </div> */}

              <div className={styles.description}>

                <button className={styles.undoBtn} onClick={showImgHideDescription}>
                  <FontAwesomeIcon icon={faArrowTurnRight} className={styles.undoBtn__icon} />
                </button>

                <div className={styles.labels}>
                  <div className={styles.label__new}></div>
                  <div className={styles.label__hot}></div>
                  <div className={styles.label__hit}></div>
                  <div className={styles.label__vegan}></div>
                </div>

                <div className={styles.columns}>

                  <div className={cn(styles.diet, styles.column)}>
                    <div className={styles.column__title}>пищевая ценность</div>
                    <div className={styles.diet__structure}>
                      <div>калории -</div>
                      <div>{product.structure.calorie}</div>
                      <div>углеводы -</div>
                      <div>{product.structure.carbohydrates}</div>
                      <div>жир -</div>
                      <div>{product.structure.fat} гр.</div>
                      <div>протеин -</div>
                      <div>{product.structure.protein} гр.</div>
                      <div>вес -</div>
                      <div>{product.structure.weight} гр.</div>
                    </div>
                  </div>

                  <div className={cn(styles.composition, styles.column)}>
                    <div className={styles.column__title}>состав</div>
                    <div className={styles.ingridients}>
                      {product.structure.ingredients.map(ingridient => {
                        return (
                          <div key={ingridient}>- {ingridient}</div>
                        )
                      })}
                    </div>

                  </div>

                </div>
              </div>

            </div>
            {/* //! Image-block: END */}

            {/* //! Edit-block: START */}
            <div className={styles.edit}>
              <button onClick={() => showEditProductForm(true)}>Редактировать</button>
            </div>
            {/* //! Edit-block: END */}


            {/* //! title-block: START */}
            <div className={styles.product__title}>
              {product.title}
            </div>
            {/* //! title-block: END */}

            {/* //! price-block: START */}
            <div className={styles.bottomRow}>
              <div className={styles.price}>
                {product.price}&#8381;
              </div>
              <button className={styles.orderBtn}>Заказать</button>
            </div>
            {/* //! price-block: END */}

          </div>
        )
      })}

      <div className={cn(styles.product, styles.newProduct)}>
        <button className={styles.newProduct__button} onClick={() => showCreateProductForm(true)}>
          <FontAwesomeIcon className={styles.newProduct__icon} icon={faCirclePlus} />
          <div className={styles.newProduct__title}>Добавить новый продукт</div>
        </button>
      </div>

    </div>)
}

export default MenuPage