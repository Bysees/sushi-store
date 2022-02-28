import React from 'react'
import { useEffect, useState, useRef } from 'react'
import styles from './slider.module.scss'

const slides = [
  'slide-0',
  'slide-1',
  'slide-2',
  'slide-3',
  'slide-4',
  'slide-5',
  'slide-6',
  'slide-7'
]

const Slider = () => {


  //TODO: Попробовать вынести всю логику в кастомный хук)

  const wrapper = useRef(null)
  const sliderRef = useRef(null)
  const slideRef = useRef(null)

  const sliderState = useRef({
    isMouseDown: false,
    startX: 0,
    currentLeft: 0,
    minOffset: 0,
    maxOffset: 0,
    blockWidth: 0,
    halfBlockWidth: 0,
  })


  const onMouseUpHandler = (e) => {
    sliderState.current.isMouseDown = false
    sliderRef.current.style.transition = '0.3s'

    const { currentLeft, halfBlockWidth } = sliderState.current

    //! Устанавливает блок относительно ближайшей границы
    const devide = Math.floor(Math.abs(currentLeft / halfBlockWidth))
    const exactDevide = devide % 2 === 0 ? devide : devide + 1
    const exactLeft = -(exactDevide * halfBlockWidth)

    setTimeout(() => sliderRef.current.style.transition = '0s')

    moving(exactLeft)
  }

  const onMouseLeaveHandler = onMouseUpHandler


  const onMouseDownHandler = (e) => {
    sliderState.current.isMouseDown = true

    sliderState.current.startX = e.pageX - sliderRef.current.offsetLeft
  }


  const onMouseMoveHandler = (e) => {

    const { isMouseDown } = sliderState.current

    if (isMouseDown) {

      let currentLeft = e.pageX - sliderState.current.startX

      if (currentLeft >= sliderState.current.minOffset) {
        currentLeft = sliderState.current.minOffset
      }

      if (currentLeft <= sliderState.current.maxOffset) {
        currentLeft = sliderState.current.maxOffset
      }

      sliderState.current.currentLeft = currentLeft

      moving(currentLeft)
    }
  }


  const moving = (x) => {
    sliderRef.current.style.left = `${x}px`
  }


  useEffect(() => {
    sliderState.current.minOffset = 0
    sliderState.current.maxOffset = -(sliderRef.current.offsetWidth - wrapper.current.offsetWidth)
    sliderState.current.blockWidth = slideRef.current.offsetWidth
    sliderState.current.halfBlockWidth = slideRef.current.offsetWidth / 2
  }, [])

  return (
    <div
      className={styles.wrapper}
      ref={wrapper}>

      <div
        className={styles.slider}
        ref={sliderRef}
        onMouseDown={onMouseDownHandler}
        onMouseMove={onMouseMoveHandler}
        onMouseUp={onMouseUpHandler}
        onMouseLeave={onMouseLeaveHandler}
      >

        {slides.map((slide, i) => (
          <div
            className={styles.slide}
            ref={slideRef}
            key={i}>
            {slide}
          </div>
        ))}
      </div>


    </div>
  )
}

export default Slider