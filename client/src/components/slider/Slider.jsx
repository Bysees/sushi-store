import { useRef, useEffect } from 'react'
import cn from 'classnames'

import SliderTool from './sliderTool'

import mainStyles from '../../pages/main/mainPage.module.scss'
import styles from './slider.module.scss'

const wrapperWidth = { width: 800 }
const slideWidth = { width: wrapperWidth.width / 2 }

const Slider = ({ renderSlides }) => {

  const sliderRef = useRef(null)

  useEffect(() => {
    const slider = new SliderTool(
      wrapperWidth.width,
      sliderRef.current,
      slideWidth.width
    )

    return () => slider.unsubscribe()
  }, [])

  return (
    <div className={cn(styles.wrapper, mainStyles.slider)} style={wrapperWidth}>
      <div className={styles.slider} ref={sliderRef}>

        {renderSlides(slideWidth)}

      </div>
    </div>
  )
}

export default Slider