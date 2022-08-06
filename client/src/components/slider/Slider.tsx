import { useRef, useEffect, FC, ReactNode } from 'react'
import cn from 'classnames'

import SliderTool from './sliderTool'

import mainStyles from '../../pages/main/mainPage.module.scss'
import styles from './slider.module.scss'

interface Props {
  width: number
  slides: number
  renderSlides: (width: number) => ReactNode
}

const Slider: FC<Props> = ({ renderSlides, width = 800, slides = 2 }) => {
  const wrapperWidth = width
  const slideWidth = wrapperWidth / slides
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sliderRef.current) {
      return
    }

    const slider = new SliderTool(wrapperWidth, sliderRef.current, slideWidth)

    return () => slider.unsubscribe()
  })

  return (
    <div
      className={cn(styles.wrapper, mainStyles.slider)}
      style={{ width: wrapperWidth }}>
      <div className={styles.slider} ref={sliderRef}>
        {renderSlides(slideWidth)}
      </div>
    </div>
  )
}

export default Slider
