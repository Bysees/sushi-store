import { useRef, useEffect } from 'react'
import cn from 'classnames'

import SliderTool from './sliderTool'

import mainStyles from '../../pages/main/mainPage.module.scss'
import styles from './slider.module.scss'


const Slider = ({ renderSlides, width = 800, slides = 2 }) => {

  const wrapperWidth = { width: width }
  const slideWidth = { width: wrapperWidth.width / slides }

  const sliderRef = useRef(null)

  useEffect(() => {
    const slider = new SliderTool(
      wrapperWidth.width,
      sliderRef.current,
      slideWidth.width
    )
    return () => slider.unsubscribe()
  })

  return (
    <div className={cn(styles.wrapper, mainStyles.slider)} style={wrapperWidth}>
      <div className={styles.slider} ref={sliderRef}>

        {renderSlides(slideWidth)}

      </div>
    </div>
  )
}

export default Slider