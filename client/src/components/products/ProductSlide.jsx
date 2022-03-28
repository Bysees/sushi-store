import React, { useRef } from 'react'
import cn from 'classnames'

import Rotate from '../animation/Rotate'
import ProductDescription from './description/ProductDescription'

import { useToogle } from '../../hooks/useToogle'

import styles from './products.module.scss'


const ProductSlide = ({ img, labels, structure, width }) => {

  const [isImage, showImage, hideImage] = useToogle(true)
  const [isDescription, showDescription, hideDescription] = useToogle(false)

  const timeoutId = useRef(null)

  const onMouseLeaveHandler = () => {
    timeoutId.current = setTimeout(hideDescription, 2000)
  }

  const onMouseOverHandler = () => {
    clearTimeout(timeoutId.current)
  }

  return (
    <div
      className={styles.product}
      style={width}
      onMouseLeave={onMouseLeaveHandler}
      onMouseOver={onMouseOverHandler}
    >

      <div className={cn(styles.rowOne, styles.rowOne_slide)}>
        <Rotate
          isFirst={isImage}
          showFirstComponent={showImage}
          isSecond={isDescription}
          showSecondComponent={showDescription}

          renderFirst={() => (
            <div className={styles.img}>
              <img src={img} alt="sushi" draggable={false} />
              <button className={styles.findPrompt} onClick={() => { }}>
                Найти в меню!
              </button>
              <button className={styles.descriptionPrompt} onClick={hideImage} />
            </div>
          )}

          renderSecond={() => (
            <ProductDescription
              onHide={hideDescription}
              labels={labels}
              structure={structure}
            />
          )}
        />
      </div>
    </div>
  )
}

export default ProductSlide