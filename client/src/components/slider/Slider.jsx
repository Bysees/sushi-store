import { useRef, useEffect } from 'react'
import cn from 'classnames'

import Products from '../products/Products'
import Product from '../products/Product'

import SliderTool from './sliderTool'

import mainStyles from '../../pages/main/mainPage.module.scss'
import styles from './slider.module.scss'

const Slider = () => {

  const sliderWrapperRef = useRef(null)
  const sliderRef = useRef(null)
  const slideRef = useRef(null)

  useEffect(() => {
    const slider = new SliderTool(
      sliderWrapperRef.current,
      sliderRef.current,
      slideRef.current
    )

    return () => slider.unsubscribe()
  }, [])


  const setProduct = (img, key) => {
    return (
      <div
        className={styles.slide}
        key={key}
        ref={slideRef}>
        <Product img={img} />
      </div>
    )
  }


  return (
    <div
      className={cn(styles.wrapper, mainStyles.slider)}
      ref={sliderWrapperRef}>

      <div
        className={styles.slider}
        ref={sliderRef}>

        {/* //* Ещё подумать над тем, как можно сделать лучше... */}
        <Products renderProduct={setProduct} />

      </div>


    </div>
  )
}

export default Slider